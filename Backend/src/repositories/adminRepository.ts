
import { UserModel } from "../interfaces/modelInterface";
import { errorResponse } from "../utils/error";
import { StatusCode, getUserCollection } from "../utils/selectDB";

class AdminRepository {
  async getAllData(role: string): Promise<UserModel[] | undefined> {
    const userCollection = getUserCollection(role);
    return await userCollection?.find().sort({ _id: 1 });
  }

  async blockUser(role: string, id: string): Promise<UserModel | null> {
    const userCollection = getUserCollection(role);
    if (!userCollection) throw errorResponse(StatusCode.SERVER_ERROR, "User Collection Error");
    return await userCollection?.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: true } },
      { new: true }
    );
  }

  async unBlockUser(role: string, id: string): Promise<UserModel | null> {
    const userCollection = getUserCollection(role);
    if (!userCollection) throw errorResponse(StatusCode.SERVER_ERROR, "User Collection Error");
    return await userCollection?.findOneAndUpdate(
      { _id: id },
      { $set: { isBlocked: false } },
      { new: true }
    );
  }
}

export default AdminRepository;

