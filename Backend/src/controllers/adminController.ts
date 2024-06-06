// import { Request, Response } from "express";
// import { ErrorResponse } from "../interfaces/errorInterface";
// import { blockUserService, getAllDataService, getPremiumCompanyListService, unBlockUserService } from "../services/adminService";
// import { StatusCode } from "../utils/selectDB";

// //<=----------------------Get Data----------------------=>//

// export const getData = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const role: string  = req.query.role as string ;
//     const data = await getAllDataService(role);
//     res.json(data);
//   } catch (error: unknown) {
//       const customError = error as ErrorResponse;
//       const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
//       res.status(statusCode).send(customError.message);
//   }
// };

// //<=----------------------Block----------------------=>//

// export const block = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id, role } = req.body;
//     await blockUserService(role, id);
//     res.json({ message: " Blocked" });
//   } catch (error:unknown) {
//     const customError = error as ErrorResponse;
//     const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
//     res.status(statusCode).send(customError.message);
//   }
// };

// //<=----------------------UnBlock----------------------=>//

// export const unBlock = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id, role } = req.body;
//     await unBlockUserService(role, id);
//     res.json({ message: " Unblocked " });
//   } catch (error: unknown) {
//     const customError = error as ErrorResponse;
//     const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
//     res.status(statusCode).send(customError.message);
//   }
// };

// //<=----------------------count of Premium Companies----------------------=>//
// export const premiumCompanyList = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const premiumCompanies =getPremiumCompanyListService()
//     res.json(premiumCompanies);
//   } catch (error: unknown) {
//     const customError = error as ErrorResponse;
//     const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
//     res.status(statusCode).send(customError.message);
//   }
// };
import { Request, Response } from "express";
import { ErrorResponse } from "../interfaces/errorInterface";
import { StatusCode } from "../utils/selectDB";
import AdminService from "../services/adminService";

class AdminController {
  private adminService = new AdminService();

  async getData(req: Request, res: Response): Promise<void> {
    try {
      const role: string = req.query.role as string;
      const data = await this.adminService.getAllDataService(role);
      res.json(data);
    } catch (error: unknown) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
      res.status(statusCode).send(customError.message);
    }
  }

  async block(req: Request, res: Response): Promise<void> {
    try {
      const { id, role } = req.body;
      await this.adminService.blockUserService(role, id);
      res.json({ message: "Blocked" });
    } catch (error: unknown) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
      res.status(statusCode).send(customError.message);
    }
  }

  async unBlock(req: Request, res: Response): Promise<void> {
    try {
      const { id, role } = req.body;
      await this.adminService.unBlockUserService(role, id);
      res.json({ message: "Unblocked" });
    } catch (error: unknown) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
      res.status(statusCode).send(customError.message);
    }
  }

  async premiumCompanyList(req: Request, res: Response): Promise<void> {
    try {
      const premiumCompanies = await this.adminService.getPremiumCompanyListService();
      res.json(premiumCompanies);
    } catch (error: unknown) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
      res.status(statusCode).send(customError.message);
    }
  }
}

export default AdminController;
