import { Request, Response } from 'express';
import * as CartService from '../services/cart';
import { catchAsync } from '../utils/catchAsync';

export const getAllCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartService.getAllCart();
  res.status(200).json({ message: 'success', cart });
});

export const getCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const cart = await CartService.getCartByOwnerId(Number(id));
  res.status(200).json({ message: 'success', cart });
});

export const updateCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartService.updateCartById(
    parseInt(req.params.id),
    req.body
  );
  return res.status(200).json({ message: 'Updated', cart });
});

export const deleteCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await CartService.deleteCartById(parseInt(id));
  res.status(200).json({ message: 'success' });
});

export const addItemsToCart = catchAsync(
  async (req: Request, res: Response) => {
    const items_id: string[] = req.body;
    await CartService.addItemsToCart(req.payload.sub, items_id);
    res.status(200).json({ message: 'success' });
  }
);
