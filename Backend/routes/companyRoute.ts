import express from "express"
import { addInterviewer, deleteInterviewer, listInterviewers } from "../controllers/companyController";
const router = express.Router();

router.post("/add-interviewer",addInterviewer)
router.post("/delete-interviewer",deleteInterviewer)
router.get("/interviewers",listInterviewers)
export default router