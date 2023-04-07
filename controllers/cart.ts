import { Request, Response } from "express";
import * as CartService from "../services/cart";
import { catchAsync } from "../utils/catchAsync";
import { CartItem } from "../entities/CartItem";

export const addCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartService.createCart();
  res.status(200).json({ message: "success", cart });
});

export const getAllCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartService.getAllCart();
  res.status(200).json({ message: "success", cart });
});

export const getCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const cart = await CartService.getCartById(Number(id));
  res.status(200).json({ message: "success", cart });
});

export const updateCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartService.updateCartById(
    parseInt(req.params.id),
    req.body
  );
  return res.status(200).json({ message: "Updated", cart });
});

export const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await CartService.deleteCartById(parseInt(id));
  res.status(200).json({ message: "success" });
});

export const addItemsToCart = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cart_items } = req.body;
    await CartService.addItemsToCart(parseInt(id), cart_items as CartItem[]);
    res.status(200).json({ message: "success" });
  }
);
