import 'dotenv/config'
import express from "express"
import cors from "cors"
import helmet from "helmet"
import { AppDataSource } from './DBconfig/dbconfig'
import userRouter from './router/user/userrouter'
import adminRouter from './router/admin/adminrouter'
const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())


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