import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { CallingIdGenerator } from "../../utils/utils";

// myappoinmentBD
const myAppointmentDB = async (user: any) => {
  const result = await prisma.patient.findUniqueOrThrow({
    where: {
      email: user.email,
    },
    include:{
      appointment:{
        select:{
          id:true,
          patientId:true,
          doctorId:true,
          status:true,
          appointmentType:true,
          videoCallingId:true,
          clinic:true,
          schedule:{
            omit:{
              id:true,
              status:true,
              createdAt:true,
              updatedAt:true,
            }
          },
        }
      },
      
    }

  });
  return result.appointment;
};
// appointmentGetDB
const appointmentGetDB=async(user:any)=>{
    const doctorInfo=await prisma.doctor.findUniqueOrThrow({
    where:{
        email:user.email
    }
    })
    const result=await prisma.doctorSchedule.findMany({
        where:{
            doctorId:doctorInfo.id,
            isBooked:true
        },
        select:{
            doctorId:false,
            isBooked:true,
            appointment:{
                select:{
                    id:true,
                    videoCallingId:true,
                    patient:true,
                    schedule:true
                }
            }
        }
    })
    return result
}
// appointmentSingleDB
const appointmentSingleDB=async(id:string)=>{
    const result=await prisma.appointment.findUniqueOrThrow({
        where:{
            id:id
        },
        select:{
          appointmentType:true,
          schedule:{
            select:{
              day:true,
              startTime:true,
              endTime:true
            }
          },
        },
    })
    return result
}
// appointmentStoreDB
const appointmentStoreDB = async (user: any, data: any) => {
  const patientInfo = await prisma.patient.findUniqueOrThrow({
    where: { email: user.email },
  });
  //  exisis booking
  const exsisBooking = await prisma.doctorSchedule.findFirst({
    where: {
      doctorId: data.doctorId,
      scheduleId: data.scheduleId,
      isBooked: true,
    },
  });

  if (exsisBooking?.isBooked === true) {
    throw new ApiError(httpStatus.CONFLICT, "Already patient booked,Sorry");
  }

  // video calling id
  const videoCallingId =CallingIdGenerator()

  const result = await prisma.$transaction(async (tx) => {
    const appointentInfo = await tx.appointment.create({
      data: {
        patientId: patientInfo.id,
        doctorId: data.doctorId,
        scheduleId: data.scheduleId,
        videoCallingId: videoCallingId,
      },
    });
    await tx.doctorSchedule.update({
      where: {
        doctorId_scheduleId: {
          doctorId: appointentInfo.doctorId,
          scheduleId: appointentInfo.scheduleId,
        },
      },
      data: {
        isBooked: true,
        appointmentId: appointentInfo.id,
      },
    });
    return appointentInfo;
  });
  return result;
};

export const appointmentService = {
  appointmentStoreDB,
  appointmentGetDB,
  appointmentSingleDB,
  myAppointmentDB,
};
