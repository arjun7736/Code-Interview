import { Request, Response, NextFunction } from "express";

export const companySignup =async (req:Request,res:Response,next:NextFunction)=>{
      console.log(req.body)
      return res.json(req.body)
}