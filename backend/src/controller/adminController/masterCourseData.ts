import { mastercourse } from "../../entities/mastercourse";
import { createResponse } from "../../helper/createResponse";

export const masterCourseInsertData = async (req: any, res: any) => {
  try {
    const { title, desc, level, rating, duration, type, status } = req.body;
    const files = req.files as {
      thumbnail: Express.Multer.File[] ;
      content: Express.Multer.File[];
    };
    const thumbnail = files.thumbnail?.[0]?.filename || "";
    const content = files?.content?.[0]?.filename || "";
    const isExist = await mastercourse.findOne({ where: { title } });
    if(isExist){
      return createResponse(res,false,400,"Course Already Exist!",isExist,true)
    }
    else{
      const result = await mastercourse.save({title, desc, level, rating, duration, type, status,thumbnail,content})
      return createResponse(res,true,200,"Course Add Successfully!",result,false)
    }
  } catch (error:any) {
   console.log(error)
   return createResponse(res,false,500,error.message || "Internal Server Error",[],true)
  }
};
