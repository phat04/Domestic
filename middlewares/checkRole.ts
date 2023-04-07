import { NextFunction, Request, Response } from "express";
import { Role } from "../entities/User";
import { CustomAPIError } from "../errors/custom-error";

export const checkRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.payload.role;
    if (!role) {
      throw new CustomAPIError("Cannot read properties of undefined", 400);
    }
    if (role === Role.ADMIN) {
      next();
    } else {
      throw new CustomAPIError("Invalid Role", 500);
    }
  } catch (err) {
    next(err);
  }
};
