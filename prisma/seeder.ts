import { Gender, userRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../src/shared/prisma";


const seederData=async()=>{
     const hashedPassword = await bcrypt.hash("12345678", 10);
}

seederData()