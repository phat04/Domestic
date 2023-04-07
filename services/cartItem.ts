import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../databases/data";
import { CartItem } from "../entities/CartItem";
import { CustomAPIError } from "../errors/custom-error";

export const createCartItem = async (body: CartItem) => {
  const cartItemRepository = AppDataSource.getRepository(CartItem);
  //const cartItem = cartItemRepository.create(body);
  const cartItem = new CartItem();
  const { quantity, cart, domestic } = body;
  cartItem.quantity = quantity;
  cartItem.cart = cart;
  cartItem.domestic = domestic;

  return await cartItemRepository.save(cartItem);
};

export const getCartItemById = async (id: number) => {
  const cartItemRepository = AppDataSource.getRepository(CartItem);
  const cartItem = await cartItemRepository.findOneBy({
    id: id,
  });
  if (!cartItem) {
    throw new CustomAPIError("Not found cartItems", StatusCodes.NOT_FOUND);
  }
  return cartItem;
};

export const getAllCartItem = async () => {
  const cartItemRepository = AppDataSource.getRepository(CartItem);
  const cartItems = await cartItemRepository.find({
    relations: { domestic: true },
  });
  if (!cartItems) {
    throw new CustomAPIError("Not found cartItems", StatusCodes.NOT_FOUND);
  }
  return cartItems;
};

export const updateCartItemById = async (id: number, body: any) => {
  if (body.id) {
    throw new CustomAPIError("Don't change id", StatusCodes.NOT_ACCEPTABLE);
  }
  const cartItemRepository = AppDataSource.getRepository(CartItem);
  let cartItem = await cartItemRepository.findOneBy({
    id: id,
  });
  if (!cartItem) {
    throw new CustomAPIError("Not found cartItem", StatusCodes.NOT_FOUND);
  }
  await cartItemRepository.update({ id: id }, body);
  return await cartItemRepository.findOne({ where: { id: id } });
};

export const deleteCartItemById = async (id: number) => {
  const cartItemRepository = AppDataSource.getRepository(CartItem);
  const cartItem = await cartItemRepository.findOne({
    where: { id: id },
  });
  if (!cartItem) {
    throw new CustomAPIError("Not found cartItem", StatusCodes.NOT_FOUND);
  }
  await cartItemRepository.delete({ id: id });
};
