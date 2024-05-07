
import { getUserCollection } from "../utils/selectDB";

export async function getAllData(role: string): Promise<any[] | undefined> {
  const userCollection = getUserCollection(role);
  return await userCollection?.find().sort({ _id: -1 });
}

export async function blockUser(role: string, id: string): Promise<any | null> {
  const userCollection = getUserCollection(role);
  return await userCollection?.findOneAndUpdate(
    { _id: id },
    { $set: { isBlocked: true } },
    { new: true }
  );
}

export async function unBlockUser(role: string, id: string): Promise<any | null> {
  const userCollection = getUserCollection(role);
  return await userCollection?.findOneAndUpdate(
    { _id: id },
    { $set: { isBlocked: false } },
    { new: true }
  );
}
