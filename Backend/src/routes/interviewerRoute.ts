import  express  from "express"
import { updateProfile } from "../controllers/interviewerController"
import { verifyToken } from "../utils/verify"
const router =express.Router()

router.post("/updateProfile",verifyToken,updateProfile)

export default router