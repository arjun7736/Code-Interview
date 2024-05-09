import { Request, Response } from "express";
import { ICompany } from "../interfaces/modelInterface";
import {
  blockUser,
  getAllData,
  unBlockUser,
} from "../repositories/adminRepository";
import { getPremiumCompanies } from "../repositories/companyRepository";
import { ErrorResponse } from "../interfaces/errorInterface";

//<=----------------------Get Data----------------------=>//

export const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const role: string | undefined = req.query.role as string | undefined;
    if (role) {
      const data = await getAllData(role);
      res.json(data);
    }
  } catch (error: unknown) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || 500;
      res.status(statusCode).send(customError.message);
  }
};

//<=----------------------Block----------------------=>//

export const block = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, role } = req.body;
    await blockUser(role, id);
    res.json({ message: " Blocked" });
  } catch (error:unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------UnBlock----------------------=>//

export const unBlock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, role } = req.body;

    await unBlockUser(role, id);

    res.json({ message: " Unblocked " });
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};

//<=----------------------count of Premium Companies----------------------=>//
export const premiumCompanyList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const premiumCompanies: ICompany[] | null = await getPremiumCompanies();
    res.json(premiumCompanies);
  } catch (error: unknown) {
    const customError = error as ErrorResponse;
    const statusCode = customError.statusCode || 500;
    res.status(statusCode).send(customError.message);
  }
};
