import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomAPIError } from "../errors/custom-error";
import { JwtPayload } from "../utils/jwtPayload";

export const checkJwtToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new CustomAPIError("please provide authHeader", 400);
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, "lama", function (err, payload) {
      if (err) {
        throw new CustomAPIError("Invalid Token", 400);
      }
      req.payload = payload;
      return next();
    });
  } catch (err) {
    next(err);
  }
};
