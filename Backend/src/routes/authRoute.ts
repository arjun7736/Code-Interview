import  express  from "express"
import { createNewPassword, forgotPasswordOTP, getIndividualData, googleSigninUser, login, logout, resentOtp, signUp, verifyForgotPasswordOTP, verifyOTP } from "../controllers/authControllers"
const router =express.Router()

router.post("/signup",signUp) 
router.post("/login",login)
router.post("/verify-otp",verifyOTP)
router.post("/forgotPassword",forgotPasswordOTP)
router.post("/verify-forgotPassword-otp",verifyForgotPasswordOTP)
router.patch("/changePassword",createNewPassword)
router.post("/resent-otp",resentOtp)
router.post("/google-signin",googleSigninUser)
router.get("/logout",logout)
router.get("/getData/:id",getIndividualData)





export default  router;