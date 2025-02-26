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

  const result = await prisma.patient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.patient.count({ where: whereConditions });

  return {
    page,
    limit,
    total,
    data: result,
  };
};

// deleteIntoDB
const deleteIntoBD = async (id: string) => {
  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: { id },
  });

  if (!!patientInfo.profilePhoto?.length) {
    fileUploader.deleteFile(patientInfo.profilePhoto);
  }

  const result = await prisma.$transaction(async (tx) => {
    const doctorDeleteInfo = await tx.patient.delete({
      where: { id: patientInfo.id },
    });
    const result = await tx.user.delete({
      where: {
        email: doctorDeleteInfo.email,
      },
    });
    return result;
  });

  return result;
};


// softDeleteBD
const softDeleteBD = async (id: string) => {
  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      id: id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (tx) => {
    const patientDeleteInfo = await tx.patient.update({
      where: { id: patientInfo.id },
      data: { isDeleted: true },
    });
    const result = await tx.user.update({
      where: {
        email: patientDeleteInfo.email,
      },
      data: {
        status: userStatus.DELETED,
      }
    });
    return result;
  });

  return result;
};

// updateProfileBD
const updateProfileBD = async (user:any, file: any, data: any) => {
  if (file) data.profilePhoto = file?.filename;

  console.log(data)
  const patientInfo=await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email
    },
  });
  

  // Delete the previous image.
  if(patientInfo.profilePhoto?.length && file?.filename?.length) {
    fileUploader.deleteFile(patientInfo.profilePhoto)
  }

  const result = await prisma.patient.update({
    where: {
      email: user.email,
    },
    data: data,
  });

  return result;
};



export const patientService = {
  getIntoBD,
  deleteIntoBD,
  softDeleteBD,
  updateProfileBD
};
