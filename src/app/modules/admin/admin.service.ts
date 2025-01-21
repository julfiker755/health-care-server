import { fileUploader } from "../../../shared/fileUploader";
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
  if (file) data.profilePhoto =file?.filename;

 const adminInfo= await prisma.admin.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

    // Delete the preview image.
    if(!!adminInfo.profilePhoto?.length) {
      fileUploader.deleteFile(adminInfo.profilePhoto)
    }
  

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
