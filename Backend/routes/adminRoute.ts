import express from "express"
import {  blockCompany, blockInterviewee, blockInterviewer, getComapnyData, getInterviewersData, getItervieweeData, unBlockCompany, unBlockInterviewee, unBlockInterviewer } from "../controllers/adminController";
const router = express.Router();

router.get("/company-data",getComapnyData)
router.get("/interviewer-data",getInterviewersData)
router.get("/interviewee-data",getItervieweeData)
router.post("/company-block",blockCompany)
router.post("/interviewer-block",blockInterviewer)
router.post("/interviewee-block",blockInterviewee)
router.post("/company-unblock",unBlockCompany)
router.post("/interviewer-unblock",unBlockInterviewer)
router.post("/interviewee-unblock",unBlockInterviewee)





export default router