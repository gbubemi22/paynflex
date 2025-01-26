import sendEmail from "../../utils/mailtrap.js";
import { generateOTP, getOtpExpiryTime } from "../../utils/util.js";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError, } from "../../utils/error.js";
import Admin from "./model.js";
import { compare, hash } from "../../utils/bcryptiUtils.js";
export const create = async (payload) => {
    const checkUser = await Admin.findOne({ email: payload.email });
    if (checkUser?.email === payload.email) {
        throw new ConflictError(`Email already in use`);
    }
    const user = await Admin.create({
        ...payload,
    });
    return {
        success: true,
        message: "Account Created",
        data: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    };
};
export const login = async (email, password) => {
    const user = await Admin.findOne({ email: email }).populate("roleId");
    console.log(user);
    const typ = user?.roleId.name;
    if (!user)
        throw new UnauthorizedError("Incorrect login details");
    if (!(await user.comparePassword(password))) {
        throw new UnauthorizedError("Incorrect login details");
    }
    const token = await user.generateJWT();
    return {
        success: true,
        message: `Welcome ${typ} Admin`,
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        },
        token,
    };
};
export const getAdminByID = async (adminId) => {
    const result = await Admin.findById({
        _id: adminId,
    }).select({
        password: 0,
    }).populate("roleId");
    if (!result)
        throw new NotFoundError(`Profile with ID: ${adminId} not on this platform`);
    const data = result;
    return {
        success: true,
        message: " Profile retried successfully!",
        data,
    };
};
export const getAllAdminService = async () => {
    const results = await Admin.find({}).select({
        password: 0,
    }).populate("roleId");
    if (!results || results.length === 0)
        throw new NotFoundError(`Agents Profile not found`);
    return {
        count: results.length,
        success: true,
        message: " Profile retried successfully!",
        data: results,
    };
};
export const forgetPasswordService = async (email) => {
    const user = await Admin.findOne({ email });
    if (!user)
        throw new NotFoundError(`User not found`);
    let otp = generateOTP();
    let expired_at = getOtpExpiryTime();
    const hashedOtp = await hash(otp);
    console.log(otp);
    await Admin.findOneAndUpdate({
        email,
    }, {
        $set: {
            otp: hashedOtp,
            expired_at: expired_at,
        },
    }, {
        new: true,
    });
    const message = `Your ${otp} expires in 10 minutes`;
    await sendEmail(user.email, "Forget Password", message);
    return {
        success: true,
        message: " Otp sent  successfully!",
        data: [],
    };
};
export const resetPasswordService = async (email, password, otp) => {
    const user = await Admin.findOne({ email });
    if (!user)
        throw new NotFoundError(`User not found`);
    if (user.otp === undefined) {
        throw new BadRequestError(`No OTP found for this user`);
    }
    const isOtpValid = await compare(otp, user.otp);
    if (!isOtpValid) {
        throw new BadRequestError(`Invalid OTP`);
    }
    const otpExpiryDuration = getOtpExpiryTime();
    if (Date.now() > otpExpiryDuration.getTime())
        throw new BadRequestError(`Expired OTP`);
    const hashedPassword = await hash(password);
    const newUser = await Admin.findOneAndUpdate({
        email,
    }, {
        $set: {
            password: hashedPassword,
            otp: null,
            expired_at: null,
        },
    });
    // const data = newUser?.toJSON();
    return {
        success: true,
        message: " Password reset  successfully!",
        data: [],
    };
};
export const changePasswordService = async (adminId, currentPassword, newPassword) => {
    const admin = await Admin.findById(adminId);
    console.log(admin?.email, admin?._id);
    if (!admin)
        throw new NotFoundError(`Admin not found`);
    const isCurrentPasswordValid = await compare(currentPassword, admin.password);
    if (!isCurrentPasswordValid) {
        throw new BadRequestError("Invalid current password");
    }
    const hashedNewPassword = await hash(newPassword);
    await Admin.findOneAndUpdate({ _id: admin.id }, { $set: { password: hashedNewPassword } });
    return {
        status: true,
        message: `Password as been change successfully`,
        data: [],
    };
};
