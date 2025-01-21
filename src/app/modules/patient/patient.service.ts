import { fileUploader } from "../../../shared/fileUploader";
import prisma from "../../../shared/prisma";




const getProfileBD = async (user:any) => {
  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  return patientInfo;
};



const updateProfileBD = async (user:any, file: any, data: any) => {
  if (file) data.profilePhoto = file?.filename;

  const patientInfo=await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  // Delete the previous image.
  if(!!patientInfo.profilePhoto?.length) {
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
  getProfileBD,
  updateProfileBD,
};
