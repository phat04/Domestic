import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../databases/data";
import { Order } from "../entities/Order";
import { CustomAPIError } from "../errors/custom-error";

export const createOrder = async (body: any) => {
  const orderRepository = AppDataSource.getRepository(Order);
  const order = orderRepository.create(body);
  return await orderRepository.save(order);
};

export const getOrderById = async (id: number) => {
  const orderRepository = AppDataSource.getRepository(Order);
  const order = await orderRepository.findOneBy({
    id: id,
  });
  if (!order) {
    throw new CustomAPIError("Not found order", StatusCodes.NOT_FOUND);
  }
  return order;
};

export const getAllOrder = async () => {
  const orderRepository = AppDataSource.getRepository(Order);
  const orders = await orderRepository.find();
  if (!orders) {
    throw new CustomAPIError("Not found orders", StatusCodes.NOT_FOUND);
  }
  return orders;
};

export const updateOrderById = async (id: number, body: any) => {
  if (body.id) {
    throw new CustomAPIError("Don't change id", 403);
  }
  const orderRepository = AppDataSource.getRepository(Order);
  let order = await orderRepository.findOneBy({
    id: id,
  });
  if (!order) {
    throw new CustomAPIError("Not found order", StatusCodes.NOT_FOUND);
  }
  await orderRepository.update({ id: id }, body);
  return await orderRepository.findOne({ where: { id: id } });
};

export const deleteOrderById = async (id: number) => {
  const orderRepository = AppDataSource.getRepository(Order);
  const order = await orderRepository.findOne({
    where: { id: id },
  });
  if (!order) {
    throw new CustomAPIError("Not found order", StatusCodes.NOT_FOUND);
  }
  await orderRepository.delete({ id: id });
};
