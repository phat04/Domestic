import { Request, Response } from "express";

export const notFoundRoute = (req: Request, res: Response) => {
  res.status(404).json({ message: "Route is not exist" });
};
