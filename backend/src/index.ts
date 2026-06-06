import 'dotenv/config'
import express from "express"
import cors from "cors"
import helmet from "helmet"
const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

const Port = process.env.PORT || 4000;

app.listen(Port,()=>{
    console.log(`server is running on ${Port}`);
    
})