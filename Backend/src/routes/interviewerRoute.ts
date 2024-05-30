import  express  from "express"
import { addQuestion, getQuestions, updateProfile } from "../controllers/interviewerController"
import { verifyToken } from "../utils/verify"
const router =express.Router()

router.post("/updateProfile",verifyToken,updateProfile)
router.post("/addQuestions",verifyToken,addQuestion)
router.get("/getQuestions",verifyToken,getQuestions)
export default router