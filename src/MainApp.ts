import express, { Application, NextFunction, Request, Response } from "express";

import cors from "cors";

import morgan from "morgan";

export const AppConfig = (app: Application) => {
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  // Configuring the routes:
};
