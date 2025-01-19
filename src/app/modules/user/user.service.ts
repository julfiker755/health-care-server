import { userRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";



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
  insertAdminBD,
  insertDoctorBD,
  insertPatientBD
};
