
export const errorHandler = (statusCode: number, message: string): Error => {
  const error: Error & { statuscode?: number } = new Error();
  error.statuscode = statusCode;
  error.message = message;
  return error;
};
