import express from "express"
import {  blockCompany, blockInterviewee, blockInterviewer, getComapnyData, getInterviewersData, getItervieweeData, unBlockCompany, unBlockInterviewee, unBlockInterviewer } from "../controllers/adminController";
import { verifyToken } from "../utils/verify";
const router = express.Router();

router.get("/company-data",verifyToken,getComapnyData)
router.get("/interviewer-data",verifyToken,getInterviewersData)
router.get("/interviewee-data",verifyToken,getItervieweeData)
router.post("/company-block",verifyToken,blockCompany)
router.post("/interviewer-block",verifyToken,blockInterviewer)
router.post("/interviewee-block",verifyToken,blockInterviewee)
router.post("/company-unblock",verifyToken,unBlockCompany)
router.post("/interviewer-unblock",verifyToken,unBlockInterviewer)
router.post("/interviewee-unblock",verifyToken,unBlockInterviewee)





export default router