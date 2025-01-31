import { Prisma } from "@prisma/client";
import { fileUploader } from "../../../shared/fileUploader";
import { paginationHelper } from "../../../shared/paginationHelpers";
import prisma from "../../../shared/prisma";

const getIntoBD=async(filters:any,options:any)=>{
  const { page, skip, limit, sortBy, sortOrder } =
  paginationHelper.calculatePagination(options);
const { search,...filterItem } = filters;
const addCondition: Prisma.AdminWhereInput[] = [];


if (search) {
  addCondition.push({
    OR:["name"]?.map((field) => ({
      [field]: {
        contains:search?.toLowerCase()
      },
    })),
  });
}

if (Object.keys(filterItem).length > 0) {
  addCondition.push({
    AND: Object.keys(filterItem).map((key) => ({
      [key]: {
        equals: (filterItem as any)[key]
      }
    }))
  })
}

addCondition.push({
  isDeleted:false
})

const whereConditions: Prisma.AdminWhereInput = addCondition.length > 0 ? { AND: addCondition } :{};

  const result=await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    }
  })

  const total = await prisma.admin.count({ where: whereConditions });

  return {
    page,
    limit,
    total,
    data:result,
  };
}



const updateProfileBD = async (user:any, file: any, data: any) => {
  if (file) data.profilePhoto =file?.filename;

 const adminInfo= await prisma.admin.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

    // Delete the preview image.
    if(adminInfo.profilePhoto?.length && file?.filename?.length) {
      fileUploader.deleteFile(adminInfo.profilePhoto)
    }
  

  const result = await prisma.admin.update({
    where: {
      email: user.email,
    },
    data: data,
  });

  return result;
};



export const adminService = {
  updateProfileBD,
  getIntoBD
};
