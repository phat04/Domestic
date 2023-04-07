import { Request, Response } from "express";
import * as domesticService from "../services/domestic";
import { catchAsync } from "../utils/catchAsync";

export const addDomestic = catchAsync(async (req: Request, res: Response) => {
  const domestic = await domesticService.createDomestic(req.body);
  res.status(200).json({ message: "success", domestic });
});

export const getAllDomestic = catchAsync(
  async (req: Request, res: Response) => {
    const domestic = await domesticService.getAllDomestic();
    res.status(200).json({ message: "success", domestic });
  }
);

export const getDomestic = catchAsync(async (req: Request, res: Response) => {
  const domestic = await domesticService.getDomesticById(
    parseInt(req.params.id)
  );
  res.status(200).json({ message: "success", domestic });
});

export const updateDomestic = catchAsync(
  async (req: Request, res: Response) => {
    const domestic = await domesticService.updateDomesticById(
      parseInt(req.params.id),
      req.body
    );
    return res.status(200).json({ message: "Updated", domestic });
  }
);

export const deleteDomestic = catchAsync(
  async (req: Request, res: Response) => {
    await domesticService.deleteDomesticById(parseInt(req.params.id));
    res.status(200).json({ message: "success" });
  }
);
