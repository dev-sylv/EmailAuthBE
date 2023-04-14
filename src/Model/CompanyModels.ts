import mongoose from "mongoose";

interface iCompany {
  userName: string;
  email: string;
  password: string;
  token: string;
  OTP: string;
  verified: boolean;
  CompanyNumber: string;
  StaffID: string;
}

interface iCompanyData extends iCompany, mongoose.Document {}

const CompanyModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    OTP: {
      type: String,
    },
    RCNumber: {
      type: String,
    },
    token: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    staff: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iCompanyData>("company", CompanyModel);
