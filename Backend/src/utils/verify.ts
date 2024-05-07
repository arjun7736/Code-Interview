import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { errorResponse } from './error';


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
      userType = 'company';
    } else if (req.cookies.interviewer_token) {
      tokenCookieName = 'interviewer_token';
      userType = 'interviewer';
    } else if (req.cookies.interviewee_token) {
      tokenCookieName = 'interviewee_token';
      userType = 'interviewee';
    } else if (req.cookies.admin_token) {
      tokenCookieName = 'admin_token';
      userType = 'admin';
    }else {
      throw errorResponse(401, 'You are not authenticated')
    }
      const token: string | undefined = req.cookies[tokenCookieName];
      if (!token) {
      throw errorResponse(401, 'You are not authenticated')
    }
      jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
      if (err) throw errorResponse(403, 'Token is not valid')
      req.user = user;
      req.userType = userType;
      if(user.isBlocked) throw errorResponse(403,"User Is Blocked")
      next();
    });
  };
