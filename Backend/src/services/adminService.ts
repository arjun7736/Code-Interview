import { ICompany } from "../interfaces/modelInterface";
import { blockUser, getAllData, unBlockUser } from "../repositories/adminRepository";
import { getPremiumCompanies } from "../repositories/companyRepository";

//<=----------------------Get All Data Service----------------------=>//

export const getAllDataService = async (role: string) => {
  return await getAllData(role);
};

//<=----------------------Block user service----------------------=>//
export const blockUserService = async (
  role: string,
  id: string
): Promise<void> => {
  await blockUser(role, id);
};


//<=----------------------UnBlock user service----------------------=>//
export const unBlockUserService = async (
    role: string,
    id: string
  ): Promise<void> => {
    await unBlockUser(role, id);
  };


//<=----------------------Premium Companies----------------------=>//
  export const getPremiumCompanyListService = async (): Promise<ICompany[] | null> => {
    return  await getPremiumCompanies();
  };