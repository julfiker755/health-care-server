import { fileUploader } from "../../../shared/fileUploader";
import prisma from "../../../shared/prisma";




const getProfileBD = async (user:any) => {
  const doctorInfo = await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  return doctorInfo;
};



const updateProfileBD = async (user:any, file: any, data: any) => {
  if (file) data.profilePhoto = file?.filename;

 const doctorInfo= await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

   // Delete the previous image
  if(!!doctorInfo.profilePhoto?.length) {
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
  getProfileBD,
  updateProfileBD,
};
