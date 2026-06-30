import express from "express"
import { forgetPassword, userLogin, userRegister } from "../../controller/userController/authUserController"
import  { UserLoginRatelimit, UserRegRatelimit } from "../../middleware/RateLimit/rateLimit"
import { PurchasedPlanUser, userPurchasePlan, userViewCourse } from "../../controller/userController/UserDatas"
import { verifyToken } from "../../middleware/authMiddleware"
const userRouter = express.Router()

userRouter.post("/register",UserRegRatelimit,userRegister)
userRouter.post("/login",UserLoginRatelimit,userLogin)
userRouter.post("/forget-passwords",UserLoginRatelimit,forgetPassword)

//Plan
userRouter.post("/purchase-plan",UserLoginRatelimit,verifyToken,userPurchasePlan)
userRouter.get("/Purchased-Plan-User",verifyToken,PurchasedPlanUser)
// Course
userRouter.get("/user-view-course",verifyToken,userViewCourse);


export default userRouter