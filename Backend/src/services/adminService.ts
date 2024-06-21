import { ErrorResponse } from "../interfaces/errorInterface";
import { ICompany } from "../interfaces/modelInterface";
import AdminRepository from "../repositories/adminRepository";
import { getPremiumCompanies } from "../repositories/companyRepository";
import { errorResponse } from "../utils/error";
import { StatusCode } from "../utils/selectDB";

class AdminService {
  private adminRepo = new AdminRepository();

  async getAllDataService(role: string){
    try {
      return await this.adminRepo.getAllData(role);
    } catch (error) {
      const customError = error as ErrorResponse;
      const statusCode = customError.statusCode || StatusCode.SERVER_ERROR;
      throw errorResponse(statusCode, "Error While Fetching Data");
    }
  }

  async blockUserService(role: string, id: string): Promise<void> {
    await this.adminRepo.blockUser(role, id);
  }

  async unBlockUserService(role: string, id: string): Promise<void> {
    await this.adminRepo.unBlockUser(role, id);
  }

  async getPremiumCompanyListService(): Promise<ICompany[] | null> {
    return await getPremiumCompanies();
  }
}

export default AdminService;
