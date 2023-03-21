import { NextFunction, Request, Response, request, response } from "express";
import { CustomAPIError } from "../errors/custom-error";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error errorHandlerMiddleware", err);
  if (err instanceof CustomAPIError) {
    console.log("asdf");

    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: "somethings are wrong" });
};
