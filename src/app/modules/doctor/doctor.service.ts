import { Prisma, userStatus } from "@prisma/client";
import { fileUploader } from "../../../shared/fileUploader";
import { paginationHelper } from "../../../shared/paginationHelpers";
import prisma from "../../../shared/prisma";




// getIntoBD
const getIntoBD = async (filters: any, options: any) => {
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { search, ...filterItem } = filters;
  const addCondition:Prisma.DoctorWhereInput[]= [];

  if (search) {
    addCondition.push({
      OR: ["name"]?.map((field) => ({
        [field]: {
          contains: search?.toLowerCase(),
        },
      })),
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

  const whereConditions:Prisma.DoctorWhereInput=
    addCondition.length > 0 ? { AND: addCondition } : {};

  const result = await prisma.doctor.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include:{
      specialities:{
        select:{
            specialitiesId:false,
            doctorId:false,
            specialities:{
               select:{
                  id:true,
                  title:true,
                  icon:true
               }
            }
        }
      }
    }
  });

  const total = await prisma.doctor.count({ where: whereConditions });

  return {
    page,
    limit,
    total,
    data: result.map(item=>({
      ...item,
      specialities:item.specialities.map(item=>item.specialities)
    })),
  };
};
// specialitieGetBD
const specialitieGetBD=async(user:any)=>{
  const doctorInfo=await prisma.doctor.findUniqueOrThrow({
    where:{
      email:user.email
    },
    include:{
      specialities:{
        select:{
            specialitiesId:false,
            doctorId:false,
            specialities:{
               select:{
                  id:true,
                  title:true,
                  icon:true
               }
            }
        }
      }
    }
  })
  console.log(doctorInfo.specialities)
  return doctorInfo.specialities.map(item=>({
    ...item.specialities
  }))
}
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
      }
    });
    return result;
  });

  return result;
};

// specialitieStoreBD
const specialitieStoreBD=async(user:any,data:any)=>{
  const doctorInfo=await prisma.doctor.findUniqueOrThrow({
    where:{
      email:user.email
    }
  })

   

 for(const ids of data?.specialitiesId){
      await prisma.doctorSpecialities.create({
        data:{
          specialitiesId:ids,
          doctorId:doctorInfo.id
        }
      })
 }

const result=await prisma.doctor.findUniqueOrThrow({
  where:{
    id:doctorInfo.id
  },
  include:{
    specialities:true
  }
})
return result
}


const updateProfileBD = async (user:any, file: any, data: any) => {
  if (file) data.profilePhoto = file?.filename;

 const doctorInfo= await prisma.doctor.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

   // Delete the previous image
  if(doctorInfo.profilePhoto?.length && file?.filename?.length) {
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
  getIntoBD,
  deleteIntoBD,
  softDeleteBD,
  updateProfileBD,
  specialitieStoreBD,
  specialitieGetBD
};
