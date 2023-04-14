import express, { Application, Request, Response } from "express";
// import { DBCONNECTION } from "./Config/Database";

// import { EnvironmentVariables } from "./Config/EnvironmentVariables";
import { AppConfig } from "./MainApp";
import mongoose from "mongoose";

// const port = EnvironmentVariables.PORT;
const port = 3445;

const LIVE_URL =
  "mongodb+srv://sylviaDB:devsylvia@cluster0.fhx2vt1.mongodb.net/EasyHr?retryWrites=true&w=majority";

const app: Application = express();
AppConfig(app);
// DBCONNECTION();

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "API READY FOR EMAIL AUTHENTICATION",
  });
});
const server = app.listen(port, () => {
  console.log("");
  console.log("Server is up and running on port", port);
  mongoose
    .connect(LIVE_URL)
    .then(() => {
      console.log(`Database is connected to server`);
    })
    .catch((error) => {
      console.log("An error occured", error);
    });
});

// To protect my server from crashing when users do what they are not supposed to do
process.on("uncaughtException", (error: Error) => {
  process.exit(1);
});
process.on("unhandledRejection", (res) => {
  server.close(() => {
    process.exit(1);
  });
});
