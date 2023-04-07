import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user";
import { catchAsync } from "../utils/catchAsync";

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.sign_up(req.body);
  const { name } = user;
  res.status(200).json({ message: "success", name });
});

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = await userService.sign_in(req.body);
      res.cookie("accessToken", accessToken, { httpOnly: true });
      return res.status(200).json({ accessToken: accessToken });
    } catch (error) {
      next(error);
    }
  }
);

export const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getAllUser();
  return res.status(200).json({ message: "success", user });
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteUserById(parseInt(req.params.id));
  res.status(200).json({ message: "success" });
});

export const changePassword = catchAsync(
  async (req: Request, res: Response) => {
    try {
      userService.changePassword(req.body, req.payload);
      res.status(200).json({ message: "save successly" });
    } catch (err) {
      console.log(err);
    }
  }
);
