import express from "express"
import { addInterviewer, buyPremium, deleteInterviewer, editInterviewer,  listInterviewers, updateProfile } from "../controllers/companyController";
import { verifyToken } from "../utils/verify";

const router = express.Router();

router.post("/add-interviewer",verifyToken,addInterviewer)
router.delete("/delete-interviewer/:id",verifyToken,deleteInterviewer)
router.get("/interviewers",verifyToken,listInterviewers)
router.post("/edit-interviewer",verifyToken,editInterviewer)
router.post("/buy-premium",verifyToken,buyPremium)
router.post("/updateProfile",verifyToken,updateProfile)
export default router