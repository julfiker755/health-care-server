import { Gender, userRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../src/shared/prisma";

const seedSuperAdmin = async () => {
  try {
    const existingSuperAdmin = await prisma.user.findFirst({
      where: {
        role: userRole.SUPER_ADMIN,
      },
    });

    if (existingSuperAdmin) {
      console.log("Super Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("12345678", 10);

    const superAdminData = await prisma.user.create({
      data: {
        email: "super@demo.com",
        password: hashedPassword,
        role: userRole.SUPER_ADMIN,
        admin: {
          create: {
            name: "Super Admin",
            contactNumber: "01741703755",
            address:"khansama",
            gender:Gender.MALE
          },
        },
      },
    });

    console.log("Super Admin Create Successfull");
  } catch (error:any) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();
