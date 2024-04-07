import {companySignup} from "../controllers/authController"
import  express  from "express"
const router =express.Router()

router.post("/company-signup",companySignup) 

export default  router;