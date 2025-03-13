import { Gender, userRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../src/shared/prisma";

const adminData = [
  {
    password: "12345678",
    admin: {
      email: "admin@demo.com",
      name: "Julfiker",
      gender: "MALE",
      contactNumber: "+1234567890",
      profilePhoto:"admin1.jpg",
      address: "123 Harmony St, Peace City, PC 12345",
    },
  },
  {
    password: "12345678",
    admin: {
      email: "admin1@demo.com",
      name: "John Doe",
      gender: "MALE",
      profilePhoto:"admin2.jpg",
      contactNumber: "+1234567890",
      address: "123 Harmony St, Peace City, PC 12345",
    },
  },
  {
    password: "12345678",
    admin: {
      email: "admin2@demo.com",
      name: "Jane Smith",
      gender: "FEMALE",
      contactNumber: "+2345678901",
      profilePhoto:"admin3.jpg",
      address: "456 Unity Ave, Kindness Town, KT 23456",
    },
  },
  {
    password: "12345678",
    admin: {
      email: "admin3@demo.com",
      name: "Michael Brown",
      gender: "MALE",
      contactNumber: "+3456789012",
      profilePhoto:"admin4.jpg",
      address: "789 Serenity Blvd, Bliss Village, BV 34567",
    },
  },
  {
    password: "12345678",
    admin: {
      email: "admin4@example.co",
      name: "Emily Davis",
      gender: "FEMALE",
      contactNumber: "+4567890123",
      profilePhoto:"admin5.jpg",
      address: "321 Tranquility Rd, Calm City, CC 45678",
    },
  },
  {
    password: "12345678",
    admin: {
      email: "admin5@example.edu",
      name: "Chris Johnson",
      gender: "MALE",
      contactNumber: "+5678901234",
      profilePhoto:"admin6.jpg",
      address: "654 Wellness St, Vitality Town, VT 56789",
    },
  },{
    password: "12345678",
    admin: {
      email: "julfiker755.bd@gmail.com",
      name: "Julfiker Islam",
      gender: "MALE",
      contactNumber: "+3456789012",
      profilePhoto:"admin4.jpg",
      address: "789 Serenity Blvd, Bliss Village, BV 34567",
    },
  },
];

const doctorData = [
  {
    password: "12345678",
    doctor: {
      name: "Dr. Alice Smith",
      email: "doctor@demo.com",
      contactNumber: "+11234567890",
      address: "123 Wellness Way, Healthy City, HC 54321",
      registrationNumber: "987654",
      experience: 8,
      gender: "FEMALE",
      appointmentFee: 150,
      qualification: "MD",
      currentWorkingPlace: "HealthCare Center",
      designation: "Consultant",
      averageRating: 4.8,
      profilePhoto:"doctor1.jpg",
    },
  },
  {
    password: "12345678",
    doctor: {
      name: "Dr. Michael Brown",
      email: "doctor1@demo.com",
      contactNumber: "+11234567893",
      address: "321 Health Ave, Wellness Town, WT 54324",
      registrationNumber: "789123",
      experience: 12,
      gender: "MALE",
      appointmentFee: 180,
      qualification: "MBBS, MD",
      currentWorkingPlace: "Health Plus Hospital",
      designation: "Cardiologist",
      averageRating: 4.6,
      profilePhoto:"doctor4.jpg",
    },
  },
  {
    password: "12345678",
    doctor: {
      name: "Dr. Sophia Martinez",
      email: "doctor2@demo.com",
      contactNumber: "+11234567896",
      address: "852 Remedy Road, Wellness City, WC 54327",
      registrationNumber: "159753",
      experience: 6,
      gender: "FEMALE",
      appointmentFee: 140,
      qualification: "MBBS, MD",
      currentWorkingPlace: "Remedy Health Center",
      designation: "Dermatologist",
      averageRating: 4.7,
      profilePhoto:"doctor7.jpg",
    },
  },
  {
    password: "12345678",
    doctor: {
      name: "Dr. Christopher Evans",
      email: "doctor3@demo.com",
      contactNumber: "+11234567897",
      address: "369 Cure Blvd, Healing City, HC 54328",
      registrationNumber: "357951",
      experience: 9,
      gender: "MALE",
      appointmentFee: 190,
      qualification: "MBBS, MD",
      currentWorkingPlace: "Healthy Life Clinic",
      designation: "Pulmonologist",
      averageRating: 4.8,
      profilePhoto:"doctor8.jpg",
    },
  },
  {
    password: "12345678",
    doctor: {
      name: "Dr. Olivia Thomas",
      email: "olivia.thomas@gmail.com",
      contactNumber: "+11234567898",
      address: "159 Health Drive, Care City, CC 54329",
      registrationNumber: "456789",
      experience: 11,
      gender: "FEMALE",
      appointmentFee: 220,
      qualification: "MBBS, MD",
      currentWorkingPlace: "Advanced Care Hospital",
      designation: "Neurologist",
      averageRating: 4.9,
      profilePhoto:"doctor9.jpg",
    },
  },
  {
    password: "12345678",
    doctor: {
      name: "Dr. James Taylor",
      email: "james.taylor@gmail.com",
      contactNumber: "+11234567899",
      address: "753 Wellness Circle, Cure City, CC 54330",
      registrationNumber: "789456",
      experience: 13,
      gender: "MALE",
      appointmentFee: 230,
      qualification: "MBBS, MD",
      currentWorkingPlace: "Comprehensive Health Clinic",
      designation: "Oncologist",
      averageRating: 4.8,
      profilePhoto:"doctor5.jpg",
    },
  },
  {
    password: "12345678",
    doctor: {
      name: "Dr. Sarah Lee",
      email: "sarah.lee@gmail.com",
      contactNumber: "+11234567892",
      address: "789 Wellness Blvd, Cure City, CC 54323",
      registrationNumber: "654321",
      experience: 5,
      gender: "FEMALE",
      appointmentFee: 120,
      qualification: "MBBS, DO",
      currentWorkingPlace: "Cure Clinic",
      designation: "Ophthalmologist",
      averageRating: 4.7,
      profilePhoto:"doctor3.jpg",
    },
  },
  {
    password: "12345678",
    doctor: {
      name: "Dr. John Doe",
      email: "john.doe@gmail.com",
      contactNumber: "+11234567891",
      address: "456 Care Street, Healing Town, HT 54322",
      registrationNumber: "123456",
      experience: 10,
      gender: "MALE",
      appointmentFee: 200,
      qualification: "MBBS, MD",
      currentWorkingPlace: "Healing Hands Hospital",
      designation: "Senior Consultant",
      averageRating: 4.9,
      profilePhoto:"doctor2.jpg",
    },
  },  {
    password: "12345678",
    doctor: {
      name: "Dr. Emily Clark",
      email: "emily.clark@gmail.com",
      contactNumber: "+11234567894",
      address: "987 Care Circle, Health City, HC 54325",
      registrationNumber: "321789",
      experience: 7,
      gender: "FEMALE",
      appointmentFee: 160,
      qualification: "MBBS, MS",
      currentWorkingPlace: "Wellness Hospital",
      designation: "Orthopedic Surgeon",
      averageRating: 4.8,
      profilePhoto:"doctor5.jpg",
    },
  },  {
    password: "12345678",
    doctor: {
      name: "Dr. David Wilson",
      email: "david.wilson@gmail.com",
      contactNumber: "+11234567895",
      address: "654 Healthy Lane, Cure Town, CT 54326",
      registrationNumber: "987123",
      experience: 15,
      gender: "MALE",
      appointmentFee: 250,
      qualification: "MBBS, MD",
      currentWorkingPlace: "Elite Health Clinic",
      designation: "Gastroenterologist",
      averageRating: 4.9,
      profilePhoto:"doctor6.jpg",
    },
  },
];

const patientData = [
  {
    password: "12345678",
    patient: {
      name: "Dr. John Doe",
      email: "patient@demo.com",
      contactNumber: "+1234567890",
      address: "789 Serenity St, Calm City, CC 12345",
      gender: "MALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Jane Smith",
      email: "patient1@demo.com",
      contactNumber: "+11234567891",
      address: "456 Peace Ave, Relax City, RC 12346",
      gender: "FEMALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Mark Taylor",
      email: "patient2@demo.com",
      contactNumber: "+11234567892",
      address: "123 Tranquil Blvd, Quiet Town, QT 12347",
      gender: "MALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Emily Johnson",
      email: "patient3@demo.com",
      contactNumber: "+11234567893",
      address: "321 Peaceful Ln, Calmville, CV 12348",
      gender: "FEMALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "David Brown",
      email: "david.brown.patient@gmail.com",
      contactNumber: "+11234567894",
      address: "654 Tranquility St, Serene City, SC 12349",
      gender: "MALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Olivia Williams",
      email: "olivia.williams@gmail.com",
      contactNumber: "+11234567895",
      address: "987 Quiet Rd, Silent Town, ST 12350",
      gender: "FEMALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Liam Jones",
      email: "liam.jones@gmail.com",
      contactNumber: "+11234567896",
      address: "741 Relax Ave, Calm Hills, CH 12351",
      gender: "MALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Sophia Martinez",
      email: "sophia.martinez.patient@gmail.com",
      contactNumber: "+11234567897",
      address: "852 Serenity Blvd, Peace City, PC 12352",
      gender: "FEMALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Ethan Davis",
      email: "ethan.davis@gmail.com",
      contactNumber: "+11234567898",
      address: "963 Calm Ln, Relaxville, RV 12353",
      gender: "MALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Ava Garcia",
      email: "ava.garcia@gmail.com",
      contactNumber: "+11234567899",
      address: "159 Tranquil Rd, Quiet City, QC 12354",
      gender: "FEMALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Mason Harris",
      email: "mason.harris@gmail.com",
      contactNumber: "+11234567900",
      address: "258 Serenity St, Silent Town, ST 12355",
      gender: "MALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Isabella Robinson",
      email: "isabella.robinson@gmail.com",
      contactNumber: "+11234567901",
      address: "369 Peace Ave, Calm Village, CV 12356",
      gender: "FEMALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "James Walker",
      email: "james.walker@gmail.com",
      contactNumber: "+11234567902",
      address: "741 Tranquil Blvd, Healing City, HC 12357",
      gender: "MALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Mia Lee",
      email: "mia.lee@gmail.com",
      contactNumber: "+11234567903",
      address: "852 Relax St, Quiet Haven, QH 12358",
      gender: "FEMALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Benjamin Allen",
      email: "benjamin.allen@gmail.com",
      contactNumber: "+11234567904",
      address: "963 Peace Blvd, Calm Town, CT 12359",
      gender: "MALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Charlotte King",
      email: "charlotte.king@gmail.com",
      contactNumber: "+11234567905",
      address: "159 Serenity Rd, Healing City, HC 12360",
      gender: "FEMALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Amelia Wright",
      email: "amelia.wright@gmail.com",
      contactNumber: "+11234567906",
      address: "258 Calm Ave, Silent Hills, SH 12361",
      gender: "FEMALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Henry Clark",
      email: "henry.clark@gmail.com",
      contactNumber: "+11234567907",
      address: "369 Tranquil Blvd, Peace Haven, PH 12362",
      gender: "MALE",
    },
  },
  {
    password: "12345678",
    patient: {
      name: "Zoe Hall",
      email: "zoe.hall@gmail.com",
      contactNumber: "+11234567908",
      address: "741 Serenity Ave, Calm City, CC 12363",
      gender: "FEMALE",
    },
  },
];

const spceialitiesData = [
  {
    title: "Ophthalmology",
    icon: "specialities-01.svg",
  },
  {
    title: "Neurology",
    icon: "specialities-02.svg",
  },
  {
    title: "Cardiology",
    icon: "specialities-03.svg",
  },
  {
    title: "Urology",
    icon: "specialities-04.svg",
  },
  {
    title: "Orthopedic",
    icon: "specialities-05.svg",
  },
  {
    title: "Dentist",
    icon: "specialities-06.svg",
  },
];


const seederData = async () => {
  try {
    // **admin**
    for (const data of adminData) {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      await prisma.user.create({
        data: {
          email: data.admin.email,
          password: hashedPassword,
          role: userRole.ADMIN,
          admin: {
            create: {
              name: data.admin.name,
              contactNumber: data.admin.contactNumber,
              address: data.admin.address,
              profilePhoto:data.admin.profilePhoto,
              gender: data.admin.gender as Gender,
            },
          },
        },
      });
    }

    //   **doctor**
    for (const data of doctorData) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      await prisma.user.create({
        data: {
          email: data.doctor.email,
          password: hashedPassword,
          role: userRole.DOCTOR,
          doctor: {
            create: {
              name: data.doctor.name,
              contactNumber: data.doctor.contactNumber,
              address: data.doctor.address,
              registrationNumber: data.doctor.registrationNumber,
              experience: data.doctor.experience,
              gender: data.doctor.gender as Gender,
              appointmentFee: data.doctor.appointmentFee,
              profilePhoto:data.doctor.profilePhoto,
              qualification: data.doctor.qualification,
              currentWorkingPlace: data.doctor.currentWorkingPlace,
              designation: data.doctor.designation,
              averageRating: data.doctor.averageRating,
            },
          },
        },
      });
    }

    //  **patient**
    for (const data of patientData) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      await prisma.user.create({
        data: {
          email: data.patient.email,
          password: hashedPassword,
          role: userRole.PATIENT,
          patient: {
            create: {
              name: data.patient.name,
              contactNumber: data.patient.contactNumber,
              address: data.patient.address,
              gender: data.patient.gender as Gender,
            },
          },
        },
      });
    }

    // ** specialities**
    for (const data of spceialitiesData) {
      await prisma.specialities.create({
        data:{
           title:data.title,
           icon:data.icon
        }
      });
    }
    console.log("Seeder successfully!");
  } catch (error) {
    console.error("Seeder Fail", error);
  } finally {
    await prisma.$disconnect();
  }
};

seederData();
