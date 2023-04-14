import express, { Application, NextFunction, Request, Response } from "express";

import cors from "cors";

import morgan from "morgan";

import ejs from "ejs";

const data = {
  name: "Peter",
  matID: "33345",
};

export const AppConfig = (app: Application) => {
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.static("public"));
  app.use(express.static(`${__dirname} public/css`));
  app.use(express.static(`${__dirname} public/asset`));
  app.use(cors());
  app.use(morgan("dev"));

  app.get("/view", (req: Request, res: Response) => {
    res.render("index", { data });
  });
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "Done",
    });
  });
  // Configuring the routes:
};
