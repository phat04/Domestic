import { Request, Response } from "express";
import * as orderService from "../services/order";
import { catchAsync } from "../utils/catchAsync";

export const addOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req.body);
  res.status(200).json({ message: "success", order });
});

export const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.getAllOrder();
  res.status(200).json({ message: "success", order });
});

export const getOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.getOrderById(parseInt(req.params.id));
  res.status(200).json({ message: "success", order });
});

export const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.updateOrderById(
    parseInt(req.params.id),
    req.body
  );
  return res.status(200).json({ message: "Updated", order });
});

export const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  await orderService.deleteOrderById(parseInt(req.params.id));
  res.status(200).json({ message: "success" });
});
