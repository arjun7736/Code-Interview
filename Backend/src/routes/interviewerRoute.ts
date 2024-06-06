import  express  from "express"
import { addQuestion, deleteQuestion, getQuestions, setMeetingLink, updateProfile, updateQuestionSet } from "../controllers/interviewerController"
import { verifyToken } from "../utils/verify"
const router =express.Router()

router.post("/updateProfile",verifyToken,updateProfile)
router.post("/addQuestions",verifyToken,addQuestion)
router.get("/getQuestions",verifyToken,getQuestions)
router.post("/setMeetingLink",verifyToken,setMeetingLink)
router.delete("/deleteQuestion/:id",verifyToken,deleteQuestion)
router.put("/updateQuestionSet",verifyToken,updateQuestionSet)

export default router