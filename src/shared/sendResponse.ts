import { Response } from "express"

const sendResponse=<T>(res:Response,jsonData:{    
    statusCode:number,
    success:boolean,
    message:string,
      meta?:{
         page:number,
         limit:number,
         total:number
      },
      data?: T | null | undefined,
      error?:T | null | undefined,
   })=>{
    res.status(jsonData.statusCode).json({
       success:jsonData.success,
       message:jsonData.message,
       meta:jsonData.meta,
       data:jsonData.data,
       error:jsonData.error
      })
 }

 export default sendResponse

