import multer from "multer"

const thumbnail_course_content = multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.fieldname === "thumbnail"){
            cb(null,"thumbnail_images")
        }
        if(file.fieldname === "content"){
            cb(null,"course_content_files")
        }
        return cb(new Error("Invalid field name"), "");
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"_"+file.originalname)
    }
}) 
export const thumbnail_course_contents = multer({storage:thumbnail_course_content})



