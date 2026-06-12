import { user } from "../../entities/user";
import { createResponse } from "../../helper/createResponse";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        const token = jwt.sign({ email: isExist.email }, "jwt_token", { expiresIn: "24h" });
        const result = {
          token,
          isExist
        }
        return createResponse(res, true, 200, "Login Successful", { result }, false);
      }
    }
 }catch(err){
      console.log(err);

 }

};