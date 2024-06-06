// import express from "express"
// import { premiumCompanyList, block, getData, unBlock } from "../controllers/";
// import { verifyToken } from "../utils/verify";
// const router = express.Router();

// router.get("/getdata",verifyToken,getData)
// router.post("/block",verifyToken,block)
// router.post("/unblock",verifyToken,unBlock)
// router.get("/premium-companies",verifyToken,premiumCompanyList)
// // router.get("/search/:query",search)




// export default router
import express from "express";
import { verifyToken } from "../utils/verify";
import  AdminController  from "../controllers/adminController"; 

class AdminRouter {
  private router: express.Router; 

  constructor() {
    this.router = express.Router(); 
    this.initRoutes();
  }

  initRoutes() {
    const adminController = new AdminController();

    this.router.get("/getdata", verifyToken, adminController.getData.bind(adminController));

    this.router.post("/block", verifyToken, adminController.block.bind(adminController));

    this.router.post("/unblock", verifyToken, adminController.unBlock.bind(adminController));

    this.router.get("/premium-companies", verifyToken, adminController.premiumCompanyList.bind(adminController));
  }

  getRouter(): express.Router {
    return this.router;
  }
}

export default AdminRouter;
