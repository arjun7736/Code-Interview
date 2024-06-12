import express from "express"
import { verifyToken } from "../utils/verify";
import { addInterviewer, buyPremium, createMeetingLink, deleteInterviewer, editInterviewer, getInterviewData, listInterviewers, updateProfile } from "../controllers/companyController";

const router = express.Router();

router.post("/add-interviewer",verifyToken,addInterviewer)
router.delete("/delete-interviewer/:id",verifyToken,deleteInterviewer)
router.get("/interviewers",verifyToken,listInterviewers)
router.post("/edit-interviewer",verifyToken,editInterviewer)
router.post("/buy-premium",verifyToken,buyPremium)
router.post("/updateProfile",verifyToken,updateProfile)
router.post("/createMeeting",verifyToken,createMeetingLink)
router.get("/getInterviewDataAndQuestions/:id",verifyToken,getInterviewData)
export default router