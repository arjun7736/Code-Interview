import { Signup,  createNewPassword,  forgotPasswordOTP,    googleSigninUser,    logout, resentOtp, verifyForgotPasswordOTP, verifyOTP, login} from "../controllers/authController"
import  express  from "express"
import { verifyToken } from "../utils/verify"
const router =express.Router()

router.post("/signup",Signup) 
router.post("/login",login)
router.post("/verify-otp",verifyOTP)
router.post("/forgotPassword",forgotPasswordOTP)
router.post("/verify-forgotPassword-otp",verifyForgotPasswordOTP)
router.patch("/changePassword",createNewPassword)
router.post("/resent-otp",resentOtp)
router.post("/google-signin",googleSigninUser)
router.get("/logout",verifyToken,logout)





export default  router;