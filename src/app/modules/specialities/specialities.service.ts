import { Prisma } from "@prisma/client";
import { fileUploader } from "../../../shared/fileUploader";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../shared/paginationHelpers";



const storeGetBD = async (filters: any, options: any) => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { search } = filters;
  const addCondition: Prisma.SpecialitiesWhereInput[] = [];


  if (search) {
    addCondition.push({
      OR: ["title"].map((field) => ({
        [field]: {
          contains: search?.toLowerCase(),
        },
      })),
    });
  }

  //  console.dir(addCondition,{depth:'inifinity'})

  const whereConditions: Prisma.SpecialitiesWhereInput = { AND: addCondition };

  const result = await prisma.specialities.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include:{
      doctor:{
        select:{
          specialitiesId:false,
          doctorId:false,
          doctor:{
            select:{
               id:true,
               name:true,
               email:true,
               profilePhoto:true,
               contactNumber:true,
               address:true,
               registrationNumber:true,
               experience:true,
               gender:true,
               appointmentFee:true,
               qualification:true,
               currentWorkingPlace:true,
               designation:true,
               averageRating:true,
               isDeleted:true
            }
          }
      }
      }
    }
  });

  const total = await prisma.specialities.count({
    where:whereConditions
  });


  return {
    page,
    limit,
    total,
    data:result.map((item)=>({
      ...item,
      doctor:item.doctor.map(item=>item.doctor)
    })),
  };
};



const storeSpceialitiesBD = async (file: any, data: any) => {
  if (file) data.icon = file?.filename;

  const result = await prisma.specialities.create({
    data: data,
  });

  return result;
};

const deleteSpceialitiesBD = async (id: string) => {
  const specialitiesInfo = await prisma.specialities.findUniqueOrThrow({
    where: {
      id,
    },
  });

  if (!!specialitiesInfo.icon?.length) {
    fileUploader.deleteFile(specialitiesInfo.icon);
  }

  const result = await prisma.specialities.delete({
    where: { id },
  });

  return result;
};



const updateSpceialitiesBD = async (file: any, data: any, id: string) => {
  if (file) data.icon = file?.filename;

  const specialitiesInfo = await prisma.specialities.findUniqueOrThrow({
    where: {
      id,
    },
  });

  //Delete the previous image.
  if (specialitiesInfo.icon?.length && file?.filename?.length) {
    fileUploader.deleteFile(specialitiesInfo.icon);
  }

  const result = await prisma.specialities.update({
    where: {
      id,
    },
    data: data,
  });

  return result;
};



export const specialitiesService = {
  updateSpceialitiesBD,
  storeSpceialitiesBD,
  deleteSpceialitiesBD,
  storeGetBD,
};
