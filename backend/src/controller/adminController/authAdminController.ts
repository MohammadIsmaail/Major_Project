import { createResponse } from "../../helper/createResponse";
import bcrypt from "bcrypt";
import { generateToken } from "../../helper/jwt";
import { admin } from "../../entities/admin";

import { masterplan } from "../../entities/masterplan";
import { mastercourse } from "../../entities/mastercourse";
import { user } from "../../entities/user";



export const adminRegister = async (req: any, res: any) => {
 
 try{
     const { name, email, password="isma@123", mobile } = req.body;
    const isExist = await admin.findOne({ where: { email: email } });
    if (isExist) {
      return createResponse(res, false, 400, "User Already Exist!", [], true);
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await admin.save({name,email,mobile,password:hashPassword})
      return createResponse(res, true, 201, "User Register Successfully!", result, false);
    }
 }catch(err){
  return createResponse(res,false,500,"Internal Server Error!",[],true)
 }

};

export const adminLogin = async (req: any, res: any) => {
 
 try{
     const {  email, password } = req.body;
    const isExist = await admin.findOne({ where: { email } });
    if (!isExist) {
      return createResponse(res, false, 404, "User Not Found!", [], true);
    } else {
      const isMatched = await bcrypt.compare(password,isExist.password)
      if(!isMatched){
        return createResponse(res, false, 404, "Please Enter Valid Password!", [], true);
      }
      else{
        const payload = {email:isExist.email,id:isExist.id}
        const token = generateToken(payload)
        return createResponse(res, true, 200, "Login Successful", { ...isExist,token }, false);
      }
    }
 }catch(err){
      console.log(err);

 }

};

export const getDashboardStats = async (req: any, res: any) => {
  try {
    const totalUsers = await admin.count();
    const totalPlans = await masterplan.count();
    const totalCourses = await mastercourse.count();

    const result = {
      users: {
        total: totalUsers,
        active: totalUsers,
      },

      plans: {
        total: totalPlans,
        active: totalPlans,
      },

      courses: {
        total: totalCourses,
        active: totalCourses,
      },

      graphData: [
        { name: "Jan", users: 5, courses: 2 },
        { name: "Feb", users: 10, courses: 5 },
        { name: "Mar", users: 15, courses: 8 },
        { name: "Apr", users: 20, courses: 12 },
        { name: "May", users: 25, courses: 18 },
        { name: "Jun", users: totalUsers, courses: totalCourses },
      ],
    };

    return createResponse(
      res,
      true,
      200,
      "Dashboard Stats Fetch Successfully!",
      result,
      false
    );
  } catch (err) {
    console.log("Dashboard Error =>", err);

    return createResponse(
      res,
      false,
      500,
      err instanceof Error
        ? err.message
        : "Internal Server Error!",
      [],
      true
    );
  }
};



export const adminGetAllUsers = async (req: any, res: any) => {
  try {
    const users = await user.find({ order: { id: "DESC" } });
    const mapped = users.map((u) => ({ ...u, isActive: u.status === 1 }));
    return createResponse(res, true, 200, "Users fetched successfully", mapped, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};
export const adminDeleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    await user.delete({ id });
    return createResponse(res, true, 200, "User deleted successfully", [], false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
  }
};
export const adminToggleUserStatus = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const existingUser = await user.findOne({ where: { id } });
    if (!existingUser) {       
      return createResponse(res, false, 404, "User not found", [], true);
    }
    const newStatus = existingUser.status === 1 ? 0 : 1;
    await user.update({ id }, { status: newStatus } as any);
    return createResponse(res, true, 200, "User status updated", { isActive: newStatus === 1 }, false);
  } catch (error: any) {
    return createResponse(res, false, 500, error.message || "Internal Server Error", [], true);
}
};