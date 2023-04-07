import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../databases/data";
import { Domestic } from "../entities/Domestic";
import { CustomAPIError } from "../errors/custom-error";

export const createDomestic = async (body: any) => {
  const domesticRepository = AppDataSource.getRepository(Domestic);
  //const domestic = domesticRepository.create(body);
  const { name, price } = body;
  const domestic = new Domestic();
  domestic.name = name;
  domestic.price = price;
  domestic.cart_items = [];
  return await domesticRepository.save(domestic);
};

export const getDomesticById = async (id: number) => {
  const domesticRepository = AppDataSource.getRepository(Domestic);
  const domestic = await domesticRepository.findOneBy({
    id: id,
  });
  if (!domestic) {
    throw new CustomAPIError("Not found domestic", StatusCodes.NOT_FOUND);
  }
  return domestic;
};

export const getAllDomestic = async () => {
  const domesticRepository = AppDataSource.getRepository(Domestic);
  const domestics = await domesticRepository.find({
    relations: { cart_items: true },
  });
  if (!domestics) {
    throw new CustomAPIError("Not found domestics", StatusCodes.NOT_FOUND);
  }
  return domestics;
};

export const updateDomesticById = async (id: number, body: any) => {
  if (body.id) {
    throw new CustomAPIError("Don't change id", StatusCodes.FORBIDDEN);
  }
  const domesticRepository = AppDataSource.getRepository(Domestic);
  let domestic = await domesticRepository.findOneBy({
    id: id,
  });
  if (!domestic) {
    throw new CustomAPIError("Not found domestic", StatusCodes.NOT_FOUND);
  }
  await domesticRepository.update({ id: id }, body);
  return await domesticRepository.findOne({ where: { id: id } });
};

export const deleteDomesticById = async (id: number) => {
  const domesticRepository = AppDataSource.getRepository(Domestic);
  const domestic = await domesticRepository.findOne({
    where: { id: id },
  });
  if (!domestic) {
    throw new CustomAPIError("Not found domestic", StatusCodes.NOT_FOUND);
  }
  await domesticRepository.delete({ id: id });
};
