import { parse } from "date-fns";

export const customFormatTime=(date:any,time:any)=>{
   const format= time.replace(/(\d)([APMapm]{2})$/, "$1 $2")
   const finalDateTime= parse(`${date} ${format}`, "yyyy-MM-dd hh.mm a", new Date());
   return finalDateTime

}
  