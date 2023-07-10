import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import http from "http";
import { ZodError } from "zod";
import { env } from "./env";
import { usersRouter } from "./http/controllers/users/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

app.use("/", usersRouter);

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Add some external analytics tool
  }

  return response.status(500).send({ message: "Internal server error" });
});

export const server = http.createServer(app);
