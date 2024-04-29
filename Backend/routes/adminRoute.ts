import express from "express"
import {  PremiumCompanies, block, getData, search, unBlock } from "../controllers/adminController";
import { verifyToken } from "../utils/verify";
const router = express.Router();

router.get("/getdata",verifyToken,getData)
router.post("/block",verifyToken,block)
router.post("/unblock",verifyToken,unBlock)
router.get("/premium-companies",PremiumCompanies)
router.get("/search/:query",search)




export default router