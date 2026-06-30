import 'dotenv/config'
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { AppDataSource } from './DBconfig/dbconfig'
import userRouter from './router/user/userrouter'
import adminRouter from './router/admin/adminrouter'
const app = express()
app.set("trust proxy", 1);
import path from "path"

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

app.use("/thumbnail_images",express.static(
    path.join(process.cwd(),"thumbnail_images")))
app.use("/course_content_files",express.static(
    path.join(process.cwd(),"course_content_files")))


AppDataSource.initialize()
.then(()=>{
    console.log("DataBase is Connected is Successfully!");
})
.catch((err:any)=>{
    console.log(err);
    
})
const Port = process.env.PORT || 4000;
app.use("/user",userRouter)
app.use("/admin",adminRouter)

app.listen(Port,()=>{
    console.log(`server is running on ${Port}`);
    
})