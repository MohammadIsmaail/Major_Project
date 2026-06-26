import jwt from "jsonwebtoken";
import { createResponse } from "../helper/createResponse";

export const verifyToken = (req: any, res: any, next: any) => {
  try {
    // console.log(req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return createResponse(res, false, 401, "No token provided", null, true);
    }

    const token = authHeader.split(" ")[1];

    // console.log("TOKEN:", token);

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN as string);

    // console.log("DECODED:", decoded);

    req.user = decoded;

    next();
  } catch (error: any) {
    console.log(error);
    return createResponse(res, false, 401, "Invalid or expired token", error.message, true);
  }
};