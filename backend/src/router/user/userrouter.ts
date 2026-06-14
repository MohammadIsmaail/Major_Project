import express from "express"
import { userLogin, userRegister } from "../../controller/userController/authUserController"
import ratelimit from "../../middleware/RateLimit/rateLimit"
const userRouter = express.Router()

userRouter.post("/register",ratelimit,userRegister)

userRouter.post("/login",ratelimit,userLogin)

export default userRouter