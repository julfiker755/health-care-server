import { Server } from "http"
import app from "./app"
import config from "./app/config"






async function main() {
   try{
    const server:Server=app.listen(config.port,()=>{
        console.log(`Server is running ${config.port}`)
     })
   
   }catch(err:any){
   console.log(err)
   }
}

main()