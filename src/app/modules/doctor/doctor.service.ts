import { userStatus } from "@prisma/client";
import { fileUploader } from "../../../shared/fileUploader";
import { paginationHelper } from "../../../shared/paginationHelpers";
import prisma from "../../../shared/prisma";




// getIntoBD
const getIntoBD = async (filters: any, options: any) => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { search, ...filterItem } = filters;
  const addCondition= [];

  if (search) {
    addCondition.push({
      OR: ["name"]?.map((field) => ({
        [field]: {
          contains: search?.toLowerCase(),
        },
      })),
    });
  }

  if (Object.keys(filterItem).length > 0) {
    addCondition.push({
      AND: Object.keys(filterItem).map((key) => ({
        [key]: {
          equals: (filterItem as any)[key],
        },
      })),
    });
  }

  addCondition.push({
    isDeleted: false,
  });

  const whereConditions=
    addCondition.length > 0 ? { AND: addCondition } : {};

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.admin.count({ where: whereConditions });

  return {
    page,
    limit,
    total,
    data: result,
  };
};

// deleteIntoDB
const deleteIntoBD = async (id: string) => {
  const adminInfo = await prisma.admin.findUniqueOrThrow({
    where: { id },
  });

  if (!!adminInfo.profilePhoto?.length) {
    fileUploader.deleteFile(adminInfo.profilePhoto);
  }

  const result = await prisma.$transaction(async (tx) => {
    const adminDeleteInfo = await tx.admin.delete({
      where: { id: adminInfo.id },
    });
    const result = await tx.user.delete({
      where: {
        email: adminDeleteInfo.email,
      },
    });
    return result;
  });

  return result;
};


// softDeleteBD
const softDeleteBD = async (id: string) => {
  const adminInfo = await prisma.admin.findUniqueOrThrow({
    where: {
      id: id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (tx) => {
    const adminDeleteInfo = await tx.admin.update({
      where: { id: adminInfo.id },
      data: { isDeleted: true },
    });
    const result = await tx.user.update({
      where: {
        email: adminDeleteInfo.email,
      },
      data: {
        status: userStatus.DELETED,
      }
    });
    return result;
  });

  return result;
};



const updateProfileBD = async (user:any, file: any, data: any) => {
  if (file) data.profilePhoto = file?.filename;

 const doctorInfo= await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

   // Delete the previous image
  if(doctorInfo.profilePhoto?.length && file?.filename?.length) {
    fileUploader.deleteFile(doctorInfo.profilePhoto)
  }
    

  const result = await prisma.doctor.update({
    where: {
      email: user.email,
    },
    data: data,
  });

  return result;
};



export const doctorService = {
  getIntoBD,
  deleteIntoBD,
  softDeleteBD,
  updateProfileBD,
};
