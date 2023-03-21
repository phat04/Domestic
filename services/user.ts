import { User } from "../entities/User";
import { AppDataSource } from "../databases/data";
import { createToken } from "../utils/createJwtToken";
import { JwtPayload } from "../utils/jwtPayload";
import { CustomAPIError } from "../errors/custom-error";

export const sign_up = async (body: any) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = new User();
  const { name, email, password } = body;
  user.name = name;
  user.email = email;
  user.password = password;
  user.hashPassword();
  return await userRepository.save(user);
};

export const sign_in = async (body: any) => {
  const userRepository = AppDataSource.getRepository(User);
  const { name, password } = body;
  const user = await userRepository.findOne({ where: { name } });
  if (user) {
    if (!user?.checkPassword(password)) {
      throw new CustomAPIError("password Invalid", 401);
    }
    const JwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    const accessToken = createToken(JwtPayload);
    return accessToken;
  } else {
    throw new CustomAPIError("Not found user", 404);
  }
};

export const getAllU = async () => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.find();
  if (!user) {
    throw new CustomAPIError("Not found user", 404);
  }
  return user;
};

export const deleteUserById = async (id: any) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: parseInt(id) },
  });
  if (!user) {
    throw new CustomAPIError("Not found user", 404);
  }
  await userRepository.delete({ id: parseInt(id) });
};
