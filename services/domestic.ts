import { AppDataSource } from "../databases/data";
import { Domestic, DomesticStatus } from "../entities/Domestic";
import { User } from "../entities/User";
import { CustomAPIError } from "../errors/custom-error";

export const createDomestic = async (body: any) => {
  const domesticRepository = AppDataSource.getRepository(Domestic);
  const domestic = domesticRepository.create(body);
  return await domesticRepository.save(domestic);
};

// export const updatedomestic = async (req: Request, res: Response) => {
//   const { user_id, status } = req.body;
//   const userRepository = AppDataSource.getRepository(User);
//   const user = userRepository.findOne({
//     where: { id: parseInt(user_id) },
//   });
//   if (typeof user !== "object") {
//     throw new CustomAPIError("Not found user", 404);
//   }
//   if (req.body.id) {
//     throw new CustomAPIError("Don't change id", 403);
//   }
//   if (status) {
//     // if (status !== domesticStatus.COMPLETE && status !== TodoStatus.NEW) {
//     //   res.status(400).json({ message: "Please enter status gain" });
//     //   return;
//     // }
//     if (status! in TodoStatus) {
//       throw new CustomAPIError("Please enter status gain", 400);
//     }
//   }
//   const { id } = req.params;
//   const todoRepository = AppDataSource.getRepository(Todo);
//   let todo = await todoRepository.findOneBy({
//     id: parseInt(id),
//   });
//   if (!todo) {
//     throw new CustomAPIError("Not found todo", 404);
//   }
//   await todoRepository.update({ id: parseInt(req.params.id) }, req.body);
//   todo = await todoRepository.findOneBy({ id: parseInt(req.params.id) });
//   return res.json({ message: "Updated", todo });
// };

export const getDomesticById = async (params: any) => {
  const { id } = params;
  const domesticRepository = AppDataSource.getRepository(Domestic);
  const domestic = await domesticRepository.findOneBy({
    id: parseInt(id),
  });
  if (!domestic) {
    throw new CustomAPIError("Not found domestic", 404);
  }
  return domestic;
};

export const getAllD = async (body: any) => {
  const { name } = body;
  const domesticRepository = AppDataSource.getRepository(Domestic);
  const domestic = await domesticRepository.find({
    where: { name: name },
  });
  if (!domestic) {
    throw new CustomAPIError("Not found domestic", 404);
  }
  return domestic;
};

export const updateDomesticById = async (id: number, body: any) => {
  if (body.id) {
    throw new CustomAPIError("Don't change id", 403);
  }
  const domesticRepository = AppDataSource.getRepository(Domestic);
  let domestic = await domesticRepository.findOneBy({
    id: id,
  });
  if (!domestic) {
    throw new CustomAPIError("Not found domestic", 404);
  }
  await domesticRepository.update({ id: id }, body);
  return await domesticRepository.findOne({ where: { id: id } });
};

export const deleteDomesticById = async (params: any) => {
  const { id } = params;
  const domesticRepository = AppDataSource.getRepository(Domestic);
  const domestic = await domesticRepository.findOne({
    where: { id: parseInt(id) },
  });
  if (!domestic) {
    throw new CustomAPIError("Not found domestic", 404);
  }
  await domesticRepository.delete({ id: parseInt(id) });
};
