
import { ErrorResponse } from "@/interfaces/errorInterface";
import { UserModel } from "../interfaces/modelInterface";
import { errorResponse } from "../utils/error";
import { StatusCode, getUserCollection } from "../utils/selectDB";

class AdminRepository {
  async getAllData(role: string): Promise<UserModel[] | undefined> {
    try {
      const userCollection = getUserCollection(role);
      return await userCollection?.find().sort({ _id: 1 });     
    } catch (error) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
      throw errorResponse(statusCode, "Error While Fetching Data");
    }
  }

  async blockUser(role: string, id: string): Promise<UserModel | null> {
    try {
      const userCollection = getUserCollection(role);
      if (!userCollection) throw errorResponse(StatusCode.SERVER_ERROR, "User Collection Error");
      return await userCollection?.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: true } },
        { new: true }
      );
    } catch (error) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
      throw errorResponse(statusCode, "Error While Blocking User");
    }
  }

  async unBlockUser(role: string, id: string): Promise<UserModel | null> {
    try {
      const userCollection = getUserCollection(role);
      if (!userCollection) throw errorResponse(StatusCode.SERVER_ERROR, "User Collection Error");
      return await userCollection?.findOneAndUpdate(
        { _id: id },
        { $set: { isBlocked: false } },
        { new: true }
      );
    } catch (error) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
      throw errorResponse(statusCode, "Error While Fetching Data");
    }
  }
}

export default AdminRepository;

