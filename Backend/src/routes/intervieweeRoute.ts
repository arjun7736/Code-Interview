import  express  from "express"
import { getQuestionSet, getQAQuestions, updateProfile, getMeetingLink, updateQuestionSet } from "../controllers/intervieweeController"
import { verifyToken } from "../utils/verify"
const router =express.Router()

router.post("/updateProfile",verifyToken,updateProfile)
router.get("/getQAQuestions/:id",getQAQuestions)
router.get("/getQuestionSet/:link",getQuestionSet)
router.get("/getMeetingLink/:id",getMeetingLink)
router.post("/updateQuestionSet",updateQuestionSet)
export default router