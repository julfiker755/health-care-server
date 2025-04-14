import { Prisma, userRole, userStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";
import { paginationHelper } from "../../../shared/paginationHelpers";

const getIntoBD = async (filters: any, options: any) => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { search } = filters;
  const addCondition: Prisma.UserWhereInput[] = [];

  if (search) {
    addCondition.push({
      OR: ["email"].map((field) => ({
        [field]: {
          contains: search.toLowerCase(),
        },
      })),
    });
  }
  const whereConditions: Prisma.UserWhereInput =
    addCondition.length > 0 ? { AND: addCondition } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    omit: {
      password: true, 
    }
  });

  const total = await prisma.user.count({ where: whereConditions });

  return {
    page,
    limit,
    total,
    data: result,
  };
};

const getMyProfileBD = async (user: any) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: userStatus.ACTIVE,
    },
    omit: {
      password: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  let profileInfo;
  if (userInfo?.role === userRole.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo?.role === userRole.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo?.role === userRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo?.role === userRole.PATIENT) {
    profileInfo = await prisma.patient.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }

  return { ...userInfo, ...profileInfo };
};

// admin
const insertAdminBD = async (data: any) => {
  const hashPassword = bcrypt.hashSync(data.password, 10);

  const userData = {
    email: data.admin.email,
    password: hashPassword,
    role: userRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });
    const adminInfo = await tx.admin.create({
      data: data.admin,
    });
    return adminInfo;
  });

  return result;
};

// doctor
const insertDoctorBD = async (data: any) => {
  const hashPassword = bcrypt.hashSync(data.password, 10);

  const userData = {
    email: data.doctor.email,
    password: hashPassword,
    role: userRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });
    const doctorInfo = await tx.doctor.create({
      data: data.doctor,
    });
    return doctorInfo;
  });

  return result;
};

// patient
const insertPatientBD = async (data: any) => {
  const hashPassword = bcrypt.hashSync(data.password, 10);

  const userData = {
    email: data.patient.email,
    password: hashPassword,
    role: userRole.PATIENT,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
    });
    const patientInfo = await tx.patient.create({
      data: data.patient,
    });
    return patientInfo;
  });

  return result;
};

export const userService = {
  getIntoBD,
  getMyProfileBD,
  insertAdminBD,
  insertDoctorBD,
  insertPatientBD,
};
