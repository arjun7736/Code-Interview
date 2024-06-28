import  express  from "express"
import { getQuestionSet, getQAQuestions, updateProfile, getMeetingLink, updateQuestionSet } from "../controllers/intervieweeController"
const router =express.Router()

router.post("/updateProfile/:id",updateProfile)
router.get("/getQAQuestions/:id",getQAQuestions)
router.get("/getQuestionSet/:link",getQuestionSet)
router.get("/getMeetingLink/:id",getMeetingLink)
router.post("/updateQuestionSet",updateQuestionSet)
export default router