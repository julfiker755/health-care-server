import { userRole } from "@prisma/client"


export type authProps={
    email:string,
    role:userRole
} | undefined | null