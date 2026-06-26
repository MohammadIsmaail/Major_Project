import express from "express"
import { userLogin, userRegister } from "../../controller/userController/authUserController"
import  { UserLoginRatelimit, UserRegRatelimit } from "../../middleware/RateLimit/rateLimit"
import { PurchasedPlanUser, userPurchasePlan } from "../../controller/userController/UserDatas"
import { verifyToken } from "../../middleware/authMiddleware"
const userRouter = express.Router()

userRouter.post("/register",UserRegRatelimit,userRegister)
userRouter.post("/login",UserLoginRatelimit,userLogin)

//Plan
userRouter.post("/purchase-plan",UserLoginRatelimit,verifyToken,userPurchasePlan)
userRouter.get("/PurchasedPlanUser",verifyToken,PurchasedPlanUser)
// Course


export default userRouter