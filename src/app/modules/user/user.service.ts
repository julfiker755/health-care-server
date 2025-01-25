import { userRole, userStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import bcrypt from "bcrypt";


const getMyProfileBD=async(user:any)=>{
  const userInfo=await prisma.user.findUniqueOrThrow({
   where:{
       email:user?.email,
       status:userStatus.ACTIVE
   },
   select:{
      id:true,
      email:true,
      role:true,
      status:true,
   }
  })


  let profileInfo
  if(userInfo?.role === userRole.SUPER_ADMIN){
    profileInfo=await prisma.admin.findUnique({
       where:{
           email:userInfo.email
       }
    })
  }else if(userInfo?.role === userRole.ADMIN){
     profileInfo=await prisma.admin.findUnique({
       where:{
           email:userInfo.email
       }
    })
  }else if(userInfo?.role === userRole.DOCTOR){
   profileInfo=await prisma.doctor.findUnique({
       where:{
           email:userInfo.email
       }
    })
  }else if(userInfo?.role === userRole.PATIENT){
   profileInfo=await prisma.patient.findUnique({
       where:{
           email:userInfo.email
       }
    })
  }

  
 
  return {...userInfo,...profileInfo}
}


// admin
const insertAdminBD = async (data:any) => {
  const hashPassword = bcrypt.hashSync(data.password, 10);

  const userData = {
    email: data.admin.email,
    password: hashPassword,
    role: userRole.ADMIN,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData
    });
   const adminInfo= await tx.admin.create({
      data:data.admin
    });
    return adminInfo;
  });

  return result
};




// doctor
const insertDoctorBD=async(data:any)=>{
const hashPassword = bcrypt.hashSync(data.password, 10);

  const userData = {
    email: data.doctor.email,
    password: hashPassword,
    role: userRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData
    });
   const doctorInfo= await tx.doctor.create({
      data:data.doctor
    });
    return doctorInfo;
  });

  return result;
  
}

// patient
const insertPatientBD=async(data:any)=>{
  const hashPassword = bcrypt.hashSync(data.password, 10);

  const userData = {
    email: data.patient.email,
    password: hashPassword,
    role: userRole.PATIENT,
  };

  const result = await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: userData
    });
   const patientInfo= await tx.patient.create({
      data:data.patient
    });
    return patientInfo;
  });

  return result;
  
}


export const userService = {
  getMyProfileBD,
  insertAdminBD,
  insertDoctorBD,
  insertPatientBD
};
