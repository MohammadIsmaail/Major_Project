import { createResponse } from "../../helper/createResponse";
import bcrypt from "bcrypt";
import { generateToken } from "../../helper/jwt";
import { admin } from "../../entities/admin";


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