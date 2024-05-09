import {Request,Response} from "express"
import { IInterviewee } from "../interfaces/modelInterface";
import { updateIntervieweeProfile } from "../repositories/intervieweeRepository";
import { ErrorResponse } from "../interfaces/errorInterface";



export const updateProfile = async (req: Request, res: Response) => {
    try {
      const id = req?.user._id;
      const { name, profilePicture } = req.body;
  
      const updatedInterviewee: IInterviewee| null =
        await updateIntervieweeProfile(id, name, profilePicture);
  
      if (updatedInterviewee) {
        const intervieweeWithoutPassword = { ...updatedInterviewee.toObject() };
        delete intervieweeWithoutPassword.password;
        res.json(intervieweeWithoutPassword);
      }
    } catch (error: unknown) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || 500;
      res.status(statusCode).send(customError.message);
    }
  };