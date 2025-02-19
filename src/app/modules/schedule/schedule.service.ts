import { paginationHelper } from "../../../shared/paginationHelpers";
import { customFormatTime } from "../../utils/utils";
import ApiError from "../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { Prisma, scheduleStatus } from "@prisma/client";
import httpStatus from "http-status";
import { format } from "date-fns";

// getIntoBD
const getIntoBD = async (filters: any, options: any) => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { status} = filters;
  const addCondition:Prisma.scheduleWhereInput[]= [];

  if (status) {
    addCondition.push({
      status: {
        in: [status?.toUpperCase()],
      },
    });
  }

  const whereConditions=
    addCondition.length > 0 ? { AND: addCondition } : {};
  const result = await prisma.schedule.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.schedule.count({ where: whereConditions });
  return {
    page,
    limit,
    total,
    data:result,
  };
};
// storeScheduleBD
const storeScheduleBD = async (data: any) => {
  const { startDate, endDate, startTime, endTime, duration } = data;
  const lastDate = endDate ? new Date(endDate) : new Date();
  let currentDate = new Date(startDate);
  const scheduleArray: Prisma.scheduleCreateManyInput[] = [];
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
        in: scheduleArray.map((schedule) => schedule.date),
      },
    },
  });

  if (existingSchedule) {
    throw new ApiError(httpStatus.CONFLICT, "Already Exists in Your Schedule");
  }

  const result = await prisma.schedule.createMany({
    data: scheduleArray,
  });
  return {
    ...result,
    id: "fbe3fbf0-d57f-4ca0-889c-bd0dfc9bb1ca",
  };
};
// deleteScheduleBD

const deleteScheduleBD=async(id:string)=>{
   await prisma.schedule.findUniqueOrThrow({
    where:{
      id,
      status:scheduleStatus.UNBOOKED
    }
   })

 const result= await  prisma.schedule.delete({
    where:{id}
  })
  return result
}


export const scheduleService = {
  getIntoBD,
  storeScheduleBD,
  deleteScheduleBD
};
