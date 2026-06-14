import express from "express"
import { adminLogin, adminRegister } from "../../controller/adminController/authAdminController"
import ratelimit from "../../middleware/RateLimit/rateLimit"
const adminRouter = express.Router()

adminRouter.post("/register",ratelimit,adminRegister)

adminRouter.post("/login",ratelimit,adminLogin)

export default adminRouter
