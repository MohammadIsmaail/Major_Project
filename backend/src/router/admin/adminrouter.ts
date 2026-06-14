import express from "express"
import { adminLogin, adminRegister } from "../../controller/adminController/authAdminController"
import  { AdminLogRatelimit, AdminRegRatelimit } from "../../middleware/RateLimit/rateLimit"
const adminRouter = express.Router()

adminRouter.post("/register",AdminRegRatelimit,adminRegister)

adminRouter.post("/login",AdminLogRatelimit,adminLogin)

export default adminRouter
