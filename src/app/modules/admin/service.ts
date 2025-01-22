import { ConflictError, UnauthorizedError } from "../../utils/error.js";
import Admin, { AdminDatatype } from "./model.js";

export const create = async (payload: AdminDatatype) => {
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

export const login = async (email: string, password: string) => {
  const user = await Admin.findOne({ email: email });

  console.log(user);

  if (!user) throw new UnauthorizedError("Incorrect login details");

  if (!(await user.comparePassword(password))) {
    throw new UnauthorizedError("Incorrect login details");
  }

  const token = await user.generateJWT();

  return {
    success: true,
    message: `Welcome ${user.role}`,
    user: {
      id: user._id,
      email: user.email,
    },
    token,
  };
};
