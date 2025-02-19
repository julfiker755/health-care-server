import { Prisma, scheduleStatus, userStatus } from "@prisma/client";
import { fileUploader } from "../../../shared/fileUploader";
import { paginationHelper } from "../../../shared/paginationHelpers";
import prisma from "../../../shared/prisma";

// getIntoBD
const getIntoBD = async (filters: any, options: any) => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { search, gender, experience, speciality, ...filterItem } = filters;
  const addCondition: Prisma.DoctorWhereInput[] = [];

  if (search) {
    addCondition.push({
      name: {
        contains: search?.toLowerCase(),
      },
    });
  }

  if (gender) {
    addCondition.push({
      gender: {
        in: [gender?.toUpperCase()],
      },
    });
  }

  if (experience) {
    const exp = parseInt(experience);
    addCondition.push({
      experience: exp > 6 ? { gte: exp } : { lte: exp },
    });
  }

  if (speciality) {
    addCondition.push({
      specialities: {
        some: {
          specialities: {
            title: speciality?.toLowerCase(),
          },
        },
      },
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

  const whereConditions: Prisma.DoctorWhereInput =
    addCondition.length > 0 ? { AND: addCondition } : {};

  const result = await prisma.doctor.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      specialities: {
        select: {
          specialitiesId: false,
          doctorId: false,
          specialities: {
            select: {
              id: true,
              title: true,
              icon: true,
            },
          },
        },
      },
      review: true,
    },
  });

  const total = await prisma.doctor.count({ where: whereConditions });

  return {
    page,
    limit,
    total,
    data: result.map((item) => ({
      ...item,
      specialities: item.specialities.map((item) => item.specialities),
    })),
  };
};

// getSingleBD
const getSingleBD = async (id: string) => {
  const result = await prisma.doctor.findUniqueOrThrow({
    where: { id },
    include: {
      specialities: {
        select: {
          specialities: true,
        },
      },
      schedule: {
        select: {
          schedule: true,
        },
      },
      review: true,
    },
  });

  return {
    ...result,
    specialities: result.specialities.map((item) => item.specialities),
    schedule: result.schedule.map((item) => item.schedule),
  };
};

// deleteIntoDB
const deleteIntoBD = async (id: string) => {
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: { id },
  });

  if (!!doctorInfo.profilePhoto?.length) {
    fileUploader.deleteFile(doctorInfo.profilePhoto);
  }

  const result = await prisma.$transaction(async (tx) => {
    const doctorDeleteInfo = await tx.doctor.delete({
      where: { id: doctorInfo.id },
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
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (tx) => {
    const doctorDeleteInfo = await tx.doctor.update({
      where: { id: doctorInfo.id },
      data: { isDeleted: true },
    });
    const result = await tx.user.update({
      where: {
        email: doctorDeleteInfo.email,
      },
      data: {
        status: userStatus.DELETED,
      },
    });
    return result;
  });

  return result;
};

// updateProfileBD
const updateProfileBD = async (user: any, file: any, data: any) => {
  if (file) data.profilePhoto = file?.filename;
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  // Delete the previous image
  if (doctorInfo.profilePhoto?.length && file?.filename?.length) {
    fileUploader.deleteFile(doctorInfo.profilePhoto);
  }

  const result = await prisma.doctor.update({
    where: {
      email: user.email,
    },
    data: data,
  });

  return result;
};

// doctor specialitieGetBD
const specialitieGetBD = async (user: any) => {
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    include: {
      specialities: {
        select: {
          specialitiesId: false,
          doctorId: false,
          specialities: true,
        },
      },
    },
  });
  return doctorInfo.specialities.map((item) => ({
    ...item.specialities,
  }));
};

// doctorspecialitieStoreBD
const specialitieStoreBD = async (user: any, data: any) => {
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  for (const ids of data?.specialitiesId) {
    await prisma.doctorSpecialities.create({
      data: {
        specialitiesId: ids,
        doctorId: doctorInfo.id,
      },
    });
  }

  const result = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: doctorInfo.id,
    },
    include: {
      specialities: true,
    },
  });
  return result;
};

// doctorspecialitieDelete
const specialitieDeleteBD = async (user: any, id: string) => {
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.doctorSpecialities.delete({
    where: {
      specialitiesId_doctorId: {
        specialitiesId: id,
        doctorId: doctorInfo.id,
      },
    },
    include: {
      specialities: true,
      doctor: false,
    },
  });
  return result?.specialities;
};

// scheduleGetBD
const scheduleGetBD = async (user: any) => {
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    include: {
      schedule: {
        select: {
          schedule: true,
        },
      },
    },
  });

  return doctorInfo.schedule.map((item) => ({
    ...item.schedule,
  }));
};
// scheduleStoreBD
const scheduleStoreBD = async (user: any, data: any) => {
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  await prisma.$transaction(async (tx) => {
    for (const id of data?.scheduleId) {
      await tx.doctorSchedule.create({
        data: {
          doctorId: doctorInfo.id,
          scheduleId: id,
        },
      });
    }

    for (const id of data?.scheduleId) {
      await tx.schedule.update({
        where: {
          id: id,
        },
        data: {
          status: scheduleStatus.BOOKED,
        },
      });
    }
  });

  const result = await prisma.doctor.findUniqueOrThrow({
    where: {
      id: doctorInfo.id,
    },
    include: {
      schedule: {
        select: {
          schedule: true,
        },
      },
    },
  });
  return result.schedule.map((item) => item.schedule);
};

// scheduleDeleteBD
const scheduleDeleteBD = async (user: any, id: string) => {
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  const result = await prisma.$transaction(async (tx) => {
    const result = await tx.doctorSchedule.delete({
      where: {
        doctorId_scheduleId: {
          doctorId: doctorInfo.id,
          scheduleId: id,
        },
      },
      include: {
        doctor: false,
        schedule: true,
      },
    });

    await tx.schedule.update({
      where: { id },
      data: {
        status: scheduleStatus.UNBOOKED,
      },
    });

    return result;
  });

  return result.schedule;
};

export const doctorService = {
  getIntoBD,
  getSingleBD,
  deleteIntoBD,
  softDeleteBD,
  updateProfileBD,
  specialitieStoreBD,
  specialitieGetBD,
  specialitieDeleteBD,
  scheduleGetBD,
  scheduleStoreBD,
  scheduleDeleteBD,
};
