import  express  from "express"
import { addQuestion, deleteQuestion, getQuestions, setMeetingLink, updateProfile, updateQuestionSet } from "../controllers/interviewerController"
const router =express.Router()

router.post("/updateProfile/:id",updateProfile)
router.post("/addQuestions",addQuestion)
router.get("/getQuestions/:id",getQuestions)
router.post("/setMeetingLink",setMeetingLink)
router.delete("/deleteQuestion/:id",deleteQuestion)
router.put("/updateQuestionSet",updateQuestionSet)

export default router