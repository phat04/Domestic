import { StatusCodes } from 'http-status-codes';
import { AppDataSource } from '../databases/data';
import { Cart } from '../entities/Cart';
import { CustomAPIError } from '../errors/custom-error';
import { createCartItem } from './cartItem';
import { CartItem } from '../entities/CartItem';
import { getDomesticById } from './domestic';
import { Domestic } from '../entities/Domestic';
import { In } from 'typeorm';

export const createCart = async (ownerId: number) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = new Cart();
  cart.cart_items = [];
  cart.ownerId = ownerId;
  return await cartRepository.save(cart);
};

export const getCartByOwnerId = async (ownerId: number) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOneBy({
    ownerId,
  });
  if (!cart) {
    throw new CustomAPIError('Not found cart', StatusCodes.NOT_FOUND);
  }
  return cart;
};

export const getAllCart = async () => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const carts = await cartRepository.find({ relations: { cart_items: true } });
  if (!carts) {
    throw new CustomAPIError('Not found cart', StatusCodes.NOT_FOUND);
  }
  return carts;
};

export const updateCartById = async (id: number, body: any) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  let cart = await cartRepository.findOneBy({
    id: id,
  });
  if (!cart) {
    throw new CustomAPIError('Not found cart', StatusCodes.NOT_FOUND);
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
    throw new CustomAPIError('Not found cart', StatusCodes.NOT_FOUND);
  }
  await cartRepository.delete({ id: id });
};

export const addItemsToCart = async (
  userId: number,
  itemsId: string[]
): Promise<void> => {
  const domesticRepo = AppDataSource.getRepository(Domestic);
  const cartItemRepo = AppDataSource.getRepository(CartItem);
  const cartRepo = AppDataSource.getRepository(Cart);
  const cart = await getCartByOwnerId(userId);

  const domestics = await domesticRepo.findBy({ id: In(itemsId) });

  const cartItems = domestics.map((domestic) => {
    const cartItem = new CartItem();
    cartItem.domestic = domestic;
    return cartItem;
  });
  await cartItemRepo.save(cartItems);

  cart.cart_items = cartItems;
  await cartRepo.save(cart);
};
