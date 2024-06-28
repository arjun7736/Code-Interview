import express from "express"
import { addInterviewer, buyPremium, createMeetingLink, deleteInterviewer, editInterviewer, getInterviewData, listInterviewers, updateProfile } from "../controllers/companyController";

const router = express.Router();

router.post("/add-interviewer",addInterviewer)
router.delete("/delete-interviewer/:id",deleteInterviewer)
router.get("/interviewers",listInterviewers)
router.post("/edit-interviewer",editInterviewer)
router.post("/buy-premium",buyPremium)
router.post("/updateProfile/:id",updateProfile)
router.post("/createMeeting",createMeetingLink)
router.get("/getInterviewDataAndQuestions/:id",getInterviewData)
export default router