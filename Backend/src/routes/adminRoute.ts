import express from "express"
import { premiumCompanyList, block, getData, unBlock } from "../controllers/adminController";
import { verifyToken } from "../utils/verify";
const router = express.Router();

router.get("/getdata",verifyToken,getData)
router.post("/block",verifyToken,block)
router.post("/unblock",verifyToken,unBlock)
router.get("/premium-companies",verifyToken,premiumCompanyList)
// router.get("/search/:query",search)




export default router