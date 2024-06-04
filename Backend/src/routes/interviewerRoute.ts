import  express  from "express"
import { addQuestion, getQuestions, setMeetingLink, updateProfile } from "../controllers/interviewerController"
import { verifyToken } from "../utils/verify"
const router =express.Router()

router.post("/updateProfile",verifyToken,updateProfile)
router.post("/addQuestions",verifyToken,addQuestion)
router.get("/getQuestions",verifyToken,getQuestions)
router.post("/setMeetingLink",verifyToken,setMeetingLink)
export default router