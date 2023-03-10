import { Request, Response } from "express";
import {
  createDomestic,
  deleteDomesticById,
  getAllD,
  getDomesticById,
  updateDomesticById,
} from "../services/domestic";

export const addDomestic = async (req: Request, res: Response) => {
  const domestic = await createDomestic(req.body);
  res.status(200).json({ message: "success", domestic });
};

export const getAllDomestic = async (req: Request, res: Response) => {
  const domestic = await getAllD(req.body);
  res.status(200).json({ message: "success", domestic });
};

export const getDomestic = async (req: Request, res: Response) => {
  const domestic = await getDomesticById(req.params);
  res.status(200).json({ message: "success", domestic });
};

export const updateDomestic = async (req: Request, res: Response) => {
  const domestic = await updateDomesticById(parseInt(req.params.id), req.body);
  return res.status(200).json({ message: "Updated", domestic });
};

export const deleteDomestic = async (req: Request, res: Response) => {
  await deleteDomesticById(req.params);
  res.status(200).json({ message: "success" });
};
