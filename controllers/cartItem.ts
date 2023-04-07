import { Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import * as cartItemService from "../services/cartItem";
import { CartItem } from "../entities/CartItem";

export const addCartItem = catchAsync(async (req: Request, res: Response) => {
  const cartItem = await cartItemService.createCartItem(req.body as CartItem);
  res.status(200).json({ message: "success", cartItem });
});

export const getAllCartItem = catchAsync(
  async (req: Request, res: Response) => {
    const cartItem = await cartItemService.getAllCartItem();
    res.status(200).json({ message: "success", cartItem });
  }
);

export const getCartItem = catchAsync(async (req: Request, res: Response) => {
  const cartItem = await cartItemService.getCartItemById(
    parseInt(req.params.id)
  );
  res.status(200).json({ message: "success", cartItem });
});

export const updateCartItem = catchAsync(
  async (req: Request, res: Response) => {
    const cartItem = await cartItemService.updateCartItemById(
      parseInt(req.params.id),
      req.body
    );
    return res.status(200).json({ message: "Updated", cartItem });
  }
);

export const deleteCartItem = catchAsync(
  async (req: Request, res: Response) => {
    await cartItemService.deleteCartItemById(parseInt(req.params.id));
    res.status(200).json({ message: "success" });
  }
);
