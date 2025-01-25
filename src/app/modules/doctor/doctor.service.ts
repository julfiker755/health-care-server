import { fileUploader } from "../../../shared/fileUploader";
import prisma from "../../../shared/prisma";





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
  updateProfileBD,
};
