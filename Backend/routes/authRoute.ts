import {adminLogin, companyLogin, companySignup,  createNewPassword,  forgotPasswordOTP,    googleSigninUser,    intervieweeLogin,  intervieweeSignup,  interviewerLogin, logout, resentOtp, verifyForgotPasswordOTP, verifyOTP} from "../controllers/authController"
import  express  from "express"
import { verifyToken } from "../utils/verify"
const router =express.Router()

router.post("/company-signup",companySignup) 
router.post("/company-login",companyLogin)
router.post("/admin-login",adminLogin)
router.post("/interviewer-login",interviewerLogin)
router.post("/interviewee-login",intervieweeLogin)
router.post("/interviewee-signup",intervieweeSignup)
router.post("/verify-otp",verifyOTP)
router.post("/forgotPassword",forgotPasswordOTP)
router.post("/verify-forgotPassword-otp",verifyForgotPasswordOTP)
router.post("/changePassword",createNewPassword)
router.post("/resent-otp",resentOtp)
router.post("/google-signin",googleSigninUser)


router.get("/logout",verifyToken,logout)





export default  router;