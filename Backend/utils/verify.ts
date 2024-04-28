import {errorHandler} from "../utils/error"
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';


declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
    userType?: string;
  }
}

  
  export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    let tokenCookieName: string;
    let userType: string;
  
    if (req.cookies.company_token) {
      tokenCookieName = 'company_token';
      userType = 'Company';
    } else if (req.cookies.interviewer_token) {
      tokenCookieName = 'interviewer_token';
      userType = 'Interviewer';
    } else if (req.cookies.interviewee_token) {
      tokenCookieName = 'interviewee_token';
      userType = 'Interviewee';
    } else if (req.cookies.admin_token) {
      tokenCookieName = 'admin_token';
      userType = 'Admin';
    }else {
      return next(errorHandler(401, 'You are not authenticated'));
    }
      const token: string | undefined = req.cookies[tokenCookieName];
      if (!token) {
      return next(errorHandler(401, 'You are not authenticated'));
    }
      jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
      if (err) return next(errorHandler(403, 'Token is not valid'));
      req.user = user;
      req.userType = userType;
      next();
    });
  };