import { ICompany } from "../interfaces/modelInterface";
import AdminRepository from "../repositories/adminRepository";
import { getPremiumCompanies } from "../repositories/companyRepository";

class AdminService {
  private adminRepo = new AdminRepository();

  async getAllDataService(role: string){
    return await this.adminRepo.getAllData(role);
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
