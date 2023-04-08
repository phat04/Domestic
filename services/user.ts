import { User } from '../entities/User';
import { AppDataSource } from '../databases/data';
import { createToken } from '../utils/createJwtToken';
import { JwtPayload } from '../utils/jwtPayload';
import { CustomAPIError } from '../errors/custom-error';
import { StatusCodes } from 'http-status-codes';
import { createCart } from './cart';

export const sign_up = async (body: any) => {
  const userRepository = AppDataSource.getRepository(User);
  const { name, email, password, role } = body;
  const userExist = await userRepository.findOne({ where: { email } });
  if (userExist) {
    throw new CustomAPIError('User has already exist', 400);
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = password;
  user.role = role;
  user.hashPassword();

  const cart = await createCart(user.id);
  user.cart = cart;

  return await userRepository.save(user);
};

export const sign_in = async (body: any) => {
  const userRepository = AppDataSource.getRepository(User);
  const { name, password } = body;
  const user = await userRepository.findOne({ where: { name } });
  if (user) {
    if (!user?.checkPassword(password)) {
      throw new CustomAPIError('password Invalid', StatusCodes.UNAUTHORIZED);
    }
    const jwtPayload: JwtPayload = {
      sub: user.id,
      role: user.role,
    };
    const accessToken = createToken(jwtPayload);
    return accessToken;
  } else {
    throw new CustomAPIError('Not found user', StatusCodes.NOT_FOUND);
  }
};

export const getAllUser = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({ relations: { cart: true } });
  //.createQueryBuilder("user").leftJoinAndSelect("user.cart", "cart").getMany();
  if (!users) {
    throw new CustomAPIError('Not found users', StatusCodes.NOT_FOUND);
  }
  return users;
};

export const deleteUserById = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: id },
  });
  if (!user) {
    throw new CustomAPIError('Not found user', StatusCodes.NOT_FOUND);
  }
  await userRepository.delete({ id: id });
};

export const logout = async (id: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: id },
  });
  if (!user) {
    throw new CustomAPIError('Not found user', StatusCodes.NOT_FOUND);
  }
  await userRepository.delete({ id: id });
};

export const changePassword = async (body: any, payload: JwtPayload) => {
  const { password, newPassword } = body;
  const { sub: id } = payload;

  const userRepository = AppDataSource.getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw new CustomAPIError('Not Found', StatusCodes.NOT_FOUND);
    }
    if (!user.checkPassword(password)) {
      throw new CustomAPIError('Incorrect password', StatusCodes.UNAUTHORIZED);
    }
    user.password = newPassword;
    user.hashPassword();
    await userRepository.save(user);
  } catch (err) {
    console.log(err);
  }
};
