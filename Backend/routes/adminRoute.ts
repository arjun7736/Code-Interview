import express from "express"
import { deleteInterviewer, getComapnyData, getInterviewersData } from "../controllers/adminController";
const router = express.Router();

router.get("/company-data",getComapnyData)
router.get("/interviewer-data",getInterviewersData)
router.delete("/interviewer-delete",deleteInterviewer)







export default router