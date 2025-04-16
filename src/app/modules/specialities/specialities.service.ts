import { Prisma } from "@prisma/client";
import { fileUploader } from "../../../shared/fileUploader";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../shared/paginationHelpers";

// storeGetBD
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
  const whereConditions: Prisma.SpecialitiesWhereInput = { AND: addCondition };

  const result = await prisma.specialities.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
    include: {
      doctor: {
        select: {
          specialitiesId: false,
          doctorId: false,
          doctor: {
            omit: {
              createdAt: true,
              updatedAt: true,
              isDeleted: true,
            },
          }
        },
      },
    },
  });

  const total = await prisma.specialities.count({
    where: whereConditions,
  });

  return {
    page,
    limit,
    total,
    data: result.map((item) => ({
      ...item,
      doctor: item.doctor.map((item) => item.doctor),
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

// deleteSpceialitiesBD
const deleteSpceialitiesBD = async (id: string) => {
  const specialitiesInfo = await prisma.specialities.findUniqueOrThrow({
    where: {
      id,
    },
  });
  if (!!specialitiesInfo.icon?.length) {
    fileUploader.deleteFile(specialitiesInfo.icon);
  }

  // doctorpecialities  find the all database
  const doctorSpecialities = await prisma.doctorSpecialities.findMany({
    where: {
      specialitiesId: id,
    },
  });

  const result = await prisma.$transaction(async (tx) => {
    if (doctorSpecialities?.length > 0) {
      for (const specialty of doctorSpecialities) {
        await tx.doctorSpecialities.delete({
          where: {
            specialitiesId_doctorId: {
              doctorId: specialty.doctorId,
              specialitiesId: specialty.specialitiesId,
            },
          },
        });
      }
    }
    const result = await tx.specialities.delete({
      where: { id },
    });
    return result;
  });

  return result;
};


// updateSpceialitiesBD
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
