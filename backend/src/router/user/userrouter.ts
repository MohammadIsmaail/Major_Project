import express from "express"
import { userLogin, userRegister } from "../../controller/userController/authUserController"
import  { UserLoginRatelimit, UserRegRatelimit } from "../../middleware/RateLimit/rateLimit"
const userRouter = express.Router()

userRouter.post("/register",UserRegRatelimit,userRegister)

userRouter.post("/login",UserLoginRatelimit,userLogin)

export default userRouter