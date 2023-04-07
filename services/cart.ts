import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../databases/data";
import { Cart } from "../entities/Cart";
import { CustomAPIError } from "../errors/custom-error";
import { createCartItem } from "./cartItem";
import { CartItem } from "../entities/CartItem";
import { getDomesticById } from "./domestic";

export const createCart = async () => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = new Cart();
  cart.cart_items = [];
  return await cartRepository.save(cart);
};

export const getCartById = async (id: number) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOneBy({
    id: id,
  });
  if (!cart) {
    throw new CustomAPIError("Not found cart", StatusCodes.NOT_FOUND);
  }
  return cart;
};

export const getAllCart = async () => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const carts = await cartRepository.find({ relations: { cart_items: true } });
  if (!carts) {
    throw new CustomAPIError("Not found cart", StatusCodes.NOT_FOUND);
  }
  return carts;
};

export const updateCartById = async (id: number, body: any) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  let cart = await cartRepository.findOneBy({
    id: id,
  });
  if (!cart) {
    throw new CustomAPIError("Not found cart", StatusCodes.NOT_FOUND);
  }
  await cartRepository.update({ id: id }, body);
  return await cartRepository.findOne({ where: { id: id } });
};

export const deleteCartById = async (id: number) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: { id: id },
  });
  if (!cart) {
    throw new CustomAPIError("Not found cart", StatusCodes.NOT_FOUND);
  }
  await cartRepository.delete({ id: id });
};

export const addItemsToCart = async (id: number, cart_items: CartItem[]) => {
  const cart = await getCartById(id);
  cart_items.forEach(async (cartItem: CartItem) => {
    const domestic = await getDomesticById(cartItem.domestic.id);

    cartItem.domestic = domestic;
    cartItem.cart = cart;

    await createCartItem(cartItem);

    // try {
    //   domestic.cart_items.push(cartItem);
    //   cart.cart_items.push(cartItem);
    // } catch (error) {
    //   throw new CustomAPIError(
    //     "pushing was wrong",
    //     StatusCodes.METHOD_NOT_ALLOWED
    //   );
    // }
  });
};
