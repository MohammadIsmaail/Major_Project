import { user } from "../../entities/user";
import { createResponse } from "../../helper/createResponse";
import bcrypt from "bcrypt";
import { generateToken } from "../../helper/jwt";
import nodemailer from "nodemailer";
import { generatePassword } from "../../helper/ForgetPassword";

export const userRegister = async (req: any, res: any) => {
 
 try{
     const { name, email, password, mobile } = req.body;
    const isExist = await user.findOne({ where: { email: email } });
    if (isExist) {
      return createResponse(res, false, 400, "User Already Exist!", [], true);
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await user.save({name,email,mobile,password:hashPassword})
      return createResponse(res, true, 201, "User Register Successfully!", result, false);
    }
 }catch(err){
  return createResponse(res,false,500,"Internal Server Error!",[],true)
 }

};
export const userLogin = async (req: any, res: any) => {
 
 try{
     const {  email, password } = req.body;
    const isExist = await user.findOne({ where: { email } });
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
      return createResponse(res, false, 404, "Internal Server Error!", [], true);

 }

};

export const forgetPassword = async (req: any, res: any)=>{
    const {email} = req.body;
    try{
        let isExist = await user.findOne({ where: { email } });
        if (!isExist) {
            return createResponse(res, false, 404, "User Not Found!", [], true);
        }
        const newPassword = generatePassword();
         const hashedPassword = await bcrypt.hash(newPassword, 10);
        const password1 = await user.update(isExist.id, { password: hashedPassword });
        // Here you would typically generate a password reset token and send an email
        return createResponse(res, true, 200, "Password reset link sent to your email!", {password1, newPassword}, false);
    }catch(err:any){
        console.log(err);
        return createResponse(res, false, 500, `Internal Server Error! || ${err.message}`, [], true);
    }
}