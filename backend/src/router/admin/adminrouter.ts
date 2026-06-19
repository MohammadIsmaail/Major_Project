import express from "express";
import {
  adminLogin,
  adminRegister,
} from "../../controller/adminController/authAdminController";
import {
  AdminLogRatelimit,
  AdminRegRatelimit,
} from "../../middleware/RateLimit/rateLimit";
import {
  getSingleMasterPlan,
  masterPlanDeleteData,
  masterPlanGetData,
  masterPlanInsertData,
  updateMasterPlanData,
} from "../../controller/adminController/msterPlanData";

import { masterCourseInsertData } from "../../controller/adminController/masterCourseData";
import { thumbnail_course_contents } from "../../helper/ImageFileUpload";
const adminRouter = express.Router();

adminRouter.post("/register", AdminRegRatelimit, adminRegister);
adminRouter.post("/login", AdminLogRatelimit, adminLogin);

//  Master Plan  masterPlanGetData

adminRouter.post("/create-master-plan", masterPlanInsertData);
adminRouter.get("/get-master-plan", masterPlanGetData);
adminRouter.delete("/delete-master-plan/:id", masterPlanDeleteData);
adminRouter.get("/get-single-master-plan/:id", getSingleMasterPlan);
adminRouter.put("/update-master-plan/:id", updateMasterPlanData);

//  Master Course  masterCourseGetData
adminRouter.post("/create-master-course",thumbnail_course_contents.fields
  ([{ name: "thumbnail",maxCount: 1,},
    { name: "content",maxCount: 1, },]),
  masterCourseInsertData,
);




export default adminRouter;
