import { Request, Response } from "express";
import {
  createCart,
  deleteCartById,
  getAllC,
  getCartById,
  updateCartById,
} from "../services/cart";

export const addCart = async (req: Request, res: Response) => {
  const cart = await createCart(req.body);
  res.status(200).json({ message: "success", cart });
};

export const getAllCart = async (req: Request, res: Response) => {
  const cart = await getAllC(req.body);
  res.status(200).json({ message: "success", cart });
};

export const getCart = async (req: Request, res: Response) => {
  const cart = await getCartById(req.params);
  res.status(200).json({ message: "success", cart });
};

export const updateCart = async (req: Request, res: Response) => {
  const cart = await updateCartById(parseInt(req.params.id), req.body);
  return res.status(200).json({ message: "Updated", cart });
};

export const deleteCart = async (req: Request, res: Response) => {
  await deleteCartById(req.params);
  res.status(200).json({ message: "success" });
};
