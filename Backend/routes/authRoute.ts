import {companyLogin, companySignup} from "../controllers/authController"
import  express  from "express"
const router =express.Router()

router.post("/company-signup",companySignup) 
router.post("/company-login",companyLogin)






export default  router;