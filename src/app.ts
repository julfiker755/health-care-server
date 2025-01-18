import express, { Application,NextFunction,Request,Response} from 'express'
import cors from 'cors'
// import router from './app/routes'
import httpStatus from 'http-status'
const app:Application = express()
import cookieParser from 'cookie-parser'


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.get("/",(req:Request,res:Response)=>{
  res.send({
    message:"Health Server is Running 😍"
  })
})



// app.use("/api/v1",router)



export default app