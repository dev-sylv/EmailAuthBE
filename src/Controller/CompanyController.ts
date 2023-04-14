import { Request, Response } from "express";
import companyModel from "../model/companyModel";
import crypto from "crypto";
import { companyEmailVerification } from "../utils/email";

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await companyModel.find();

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companies = await companyModel.findById(id);

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companies = await companyModel.findByIdAndUpdate(
      id,
      {},
      { new: true }
    );

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const companies = await companyModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const token = crypto.randomBytes(64).toString("hex");
    const OTP = crypto.randomBytes(2).toString("hex");
    const RCNumber = crypto.randomBytes(4).toString("hex");

    const companies = await companyModel.create({
      email,
      password,
      name,
      token,
      RCNumber,
      OTP,
    });

    companyEmailVerification(companies).then(() => {
      console.log("email sent");
    });

    res.status(200).json({
      message: "companies",
      data: companies,
    });
  } catch (error) {
    console.log(error);
  }
};
