import { AppDataSource } from "../databases/data";
import { Cart } from "../entities/Cart";
import { CustomAPIError } from "../errors/custom-error";

export const createCart = async (body: any) => {
  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = cartRepository.create(body);
  return await cartRepository.save(cart);
};

export const getCartById = async (params: any) => {
  const { id } = params;
  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOneBy({
    id: parseInt(id),
  });
  if (!cart) {
    throw new CustomAPIError("Not found cart", 404);
  }
  return cart;
};

export const getAllC = async (body: any) => {
  const { userId } = body;
  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.find({
    where: { userId: userId },
  });
  if (!cart) {
    throw new CustomAPIError("Not found cart", 404);
  }
  return cart;
};

export const updateCartById = async (id: number, body: any) => {
  if (body.id) {
    throw new CustomAPIError("Don't change id", 403);
  }
  const cartRepository = AppDataSource.getRepository(Cart);
  let cart = await cartRepository.findOneBy({
    id: id,
  });
  if (!cart) {
    throw new CustomAPIError("Not found cart", 404);
  }
  await cartRepository.update({ id: id }, body);
  return await cartRepository.findOne({ where: { id: id } });
};

export const deleteCartById = async (params: any) => {
  const { id } = params;
  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: { id: parseInt(id) },
  });
  if (!cart) {
    throw new CustomAPIError("Not found cart", 404);
  }
  await cartRepository.delete({ id: parseInt(id) });
};
