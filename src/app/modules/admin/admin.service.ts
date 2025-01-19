import prisma from "../../../shared/prisma";




const getProfileBD = async (user:any) => {
  const adminInfo = await prisma.admin.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  return adminInfo;
};



const updateProfileBD = async (user:any, file: any, data: any) => {
  if (file) data.profilePhoto = file?.originalname;

  await prisma.admin.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.admin.update({
    where: {
      email: user.email,
    },
    data: data,
  });

  return result;
};



export const adminService = {
  getProfileBD,
  updateProfileBD,
};
