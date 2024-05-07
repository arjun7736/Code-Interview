import { ErrorResponse } from "../interfaces/errorInterface";

export const errorResponse = (
  statusCode: number,
  message: string
): ErrorResponse => {
  return { statusCode, message };
};  

