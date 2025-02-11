import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type AdminDocument = mongoose.Document & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  roleId: mongoose.Types.ObjectId;
  verifiedEmail: boolean;
  verifiedNumber: boolean;
  block: boolean;
  otp?: string;
  expired_at?: string;

  comparePassword(candidatePassword: string): Promise<boolean>;
  generateJWT(): Promise<string>;
};

export type AdminDatatype = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const AdminSchema = new mongoose.Schema<AdminDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      required: true,
    },

    otp: {
      type: String,
      required: false,
    },
    expired_at: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "Admin",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(9);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

AdminSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      id: this._id,
      role: this.roleId.name,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.JWT_TOKEN_VALIDITY }
  );
  return token;
};

const Admin = mongoose.model<AdminDocument>("Admin", AdminSchema);

export default Admin;
