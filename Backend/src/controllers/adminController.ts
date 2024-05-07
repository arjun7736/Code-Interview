import { Request, Response } from "express";
import { ICompany } from "../interfaces/modelInterface";
import { blockUser, getAllData, unBlockUser } from "../repositories/adminRepository";
import { getPremiumCompanies } from "../repositories/companyRepository";

//<=----------------------Get Data----------------------=>//
export const getData = async (req: Request, res: Response): Promise<void> => {
  try {
    const role: string | undefined = req.query.role as string | undefined;
    if (role) {
      const data = await getAllData(role);
      res.json(data);
    }
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------Block----------------------=>//

export const block = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, role } = req.body;
    await blockUser(role, id);
    res.json({ message: " Blocked" });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------UnBlock----------------------=>//

export const unBlock = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, role } = req.body;

    await unBlockUser(role, id);

    res.json({ message: " Unblocked " });
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};

//<=----------------------count of Premium Companies----------------------=>//
export const PremiumCompanies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const premiumCompanies: ICompany[] | null =
      await getPremiumCompanies();

    res.json(premiumCompanies);
  } catch (error: any) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send(error.message);
  }
};
