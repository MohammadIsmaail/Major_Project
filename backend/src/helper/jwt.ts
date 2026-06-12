import jwt from "jsonwebtoken";
import 'dotenv/config'

export const generateToken=(payload:any)=>{
  const token = jwt.sign(payload, process.env.SECRET_TOKEN as string, { expiresIn: "24h" });
  return token
}