import { NextFunction, Request, Response } from "express";
import { deleteUserById, getAllU, sign_in, sign_up } from "../services/user";
import { User } from "../entities/User";
import { CustomAPIError } from "../errors/custom-error";

export const register = async (req: Request, res: Response) => {
  const user = await sign_up(req.body);
  if (!user) {
    throw new CustomAPIError("Not found user", 404);
  }
  const { name } = user;
  res.status(200).json({ message: "success", name });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = await sign_in(req.body);
    res.cookie("accessToken", accessToken, { httpOnly: true });
    return res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (req: Request, res: Response) => {
  const user = await getAllU();
  return res.status(200).json({ message: "success", user });
};

export const deleteUser = async (req: Request, res: Response) => {
  await deleteUserById(req.params.id);
  res.status(200).json({ message: "success" });
};
