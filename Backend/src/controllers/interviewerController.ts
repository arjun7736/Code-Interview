import {Request,Response} from "express"
import { IInterviewer } from "../interfaces/modelInterface";
import { updateinterviewerProfile } from "../repositories/interviewerRepository";
import { ErrorResponse } from "../interfaces/errorInterface";


export const updateProfile = async (req: Request, res: Response) => {
    try {
      const id = req?.user._id;
      const { name, profilePicture } = req.body;
  
      const updatedInterviewer: IInterviewer| null =
        await updateinterviewerProfile(id, name, profilePicture);
  
      if (updatedInterviewer) {
        const companyWithoutPassword = { ...updatedInterviewer.toObject() };
        delete companyWithoutPassword.password;
        res.json(companyWithoutPassword);
      }
    } catch (error: unknown) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || 500;
      res.status(statusCode).send(customError.message);
    }
  };
  