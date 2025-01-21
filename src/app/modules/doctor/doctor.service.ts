import prisma from "../../../shared/prisma";




const getProfileBD = async (user:any) => {
  const adminInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  return adminInfo;
};



const updateProfileBD = async (user:any, file: any, data: any) => {
  if (file) data.profilePhoto = file?.filename;

  await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const result = await prisma.doctor.update({
    where: {
      email: user.email,
    },
    data: data,
  });

  return result;
};



export const doctorService = {
  getProfileBD,
  updateProfileBD,
};
