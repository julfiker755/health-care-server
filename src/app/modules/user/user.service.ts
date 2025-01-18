import { userRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";



const insertAdminBD = async (file: any, data: any) => {
  if (file) {
    data.admin.profilePhoto = file?.originalname;
  }
  const hashPassword = bcrypt.hashSync(data.password, 10);

  const userData = {
    email: data.admin.email,
    password: hashPassword,

    role: userRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData,
      include: {
        admin: true,
      },
    });
   const adminInfo= await tx.admin.create({
      data:data.admin
    });
    return adminInfo;
  });

  return result;
};



export const userService = {
  insertAdminBD,
};
