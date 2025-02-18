import { format} from "date-fns";
import prisma from "../../../shared/prisma";
import { customFormatTime } from "../../utils/utils";
import { Prisma } from "@prisma/client";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";

const storeScheduleBD = async (data: any) => {
  const { startDate, endDate, startTime, endTime, duration } = data;
  const lastDate = endDate ? new Date(endDate) : new Date();
  let currentDate = new Date(startDate);
  const scheduleArray:Prisma.scheduleCreateManyInput[] = [];
  // N.B : 1st loop date create 2nd loop time create
  while (currentDate <= lastDate) {
    const formattedDate = format(currentDate, "yyyy-MM-dd");
    const day = format(currentDate, "EEEE");
    let finalStartTime = customFormatTime(formattedDate, startTime);
    let finalEndTime = customFormatTime(formattedDate, endTime);

    //  time create loop
    while (finalStartTime < finalEndTime) {
      let slotEnd = new Date(finalStartTime.getTime() + duration * 60000);
      if (slotEnd > finalEndTime) break;

      scheduleArray.push({
        date: formattedDate,
        startTime: format(finalStartTime, "hh:mm a"),
        endTime: format(slotEnd, "hh:mm a"),
        day: day,
      });
      finalStartTime = slotEnd;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const existingSchedule = await prisma.schedule.findFirst({
    where: {
      date: {
        in: scheduleArray.map(schedule => schedule.date)  
      }
    }
  });

  if(existingSchedule){
    throw new ApiError(httpStatus.CONFLICT,'Already Exists in Your Schedule')
  }
  
  const result=await prisma.schedule.createMany({
    data:scheduleArray,
  })
  return  {
    ...result,
    id:'fbe3fbf0-d57f-4ca0-889c-bd0dfc9bb1ca'
  }
};

export const scheduleService = {
  storeScheduleBD,
};
