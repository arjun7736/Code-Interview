import express from "express";
import  AdminController  from "../controllers/adminController"; 

class AdminRouter {
  private router: express.Router; 

  constructor() {
    this.router = express.Router(); 
    this.initRoutes();
  }

  initRoutes() {
    const adminController = new AdminController();

    this.router.get("/getdata",  adminController.getData.bind(adminController));

    this.router.post("/block",  adminController.block.bind(adminController));

    this.router.post("/unblock",  adminController.unBlock.bind(adminController));

    this.router.get("/premium-companies",  adminController.premiumCompanyList.bind(adminController));
  }

  getRouter(): express.Router {
    return this.router;
  }
}

export default AdminRouter;
