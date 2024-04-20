import express from "express"
import { addInterviewer, deleteInterviewer, editInterviewer, listInterviewers } from "../controllers/companyController";
const router = express.Router();

router.post("/add-interviewer",addInterviewer)
router.delete("/delete-interviewer/:id",deleteInterviewer)
router.get("/interviewers",listInterviewers)
router.post("/edit-interviewer",editInterviewer)

export default router