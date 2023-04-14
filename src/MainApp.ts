import express, { Application, NextFunction, Request, Response } from "express";

import cors from "cors";

import morgan from "morgan";

import ejs from "ejs";

export const AppConfig = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.set("view engine", ejs);
  app.use("/view", (req: Request, res: Response) => {
    res.render("index");
  });
  // Configuring the routes:
};
