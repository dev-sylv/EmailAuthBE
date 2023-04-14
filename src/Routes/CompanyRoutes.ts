import express, { Router } from "express";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompany,
} from "../Controller/CompanyController";

const router: Router = express.Router();
router.route("/").get(getCompanies);
router.route("/:id").get(getCompany);
router.route("/:id").delete(deleteCompany);
router.route("/create").post(createCompany);

export default router;
