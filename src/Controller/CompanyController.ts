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
