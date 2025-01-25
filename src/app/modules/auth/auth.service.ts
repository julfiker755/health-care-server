import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";
import { userStatus } from "@prisma/client";
import { Secret } from "jsonwebtoken";
import emailSender from "../../../helpers/emailSender";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import config from "../../config";
import bcrypt from "bcrypt";

type authProps = {
  email: string;
  password: string;
};

// auth login
const loginAuth = async (data: authProps) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: data.email,
      status: userStatus.ACTIVE,
    },
  });

  const isCorrectPassword: Boolean = await bcrypt.compare(
    data.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is not vaild");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.secret as Secret,
    config.jwt.accessTokenExpiration as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.secret as Secret,
    config.jwt.refreshTokenExpiration
  );
  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

//   refreshToken
const refreshToken = async (token: string) => {
  let decodedToken;
  try {
    decodedToken = jwtHelpers.varifyToken(token, "julfiker");
  } catch (err) {
    throw new Error("You do not have permission.");
  }
  const isUserExsis = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedToken.email,
      status: userStatus.ACTIVE,
    },
  });
  const accessToken = jwtHelpers.generateToken(
    {
      email: isUserExsis.email,
      role: isUserExsis.role,
    },
    config.jwt.secret as Secret,
    config.jwt.refreshTokenExpiration
  );

  return {
    accessToken,
    needPasswordChange: isUserExsis.needPasswordChange,
  };
};

// change password
const changePassword = async (user: any, data: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: userStatus.ACTIVE,
    },
  });
  const isCorrectPassword: Boolean = await bcrypt.compare(
    data.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("Password is not vaild");
  }
  const hashPassword = bcrypt.hashSync(data.newPassword, 10);
  const result = await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashPassword,
      needPasswordChange: true,
    },
  });
  return result;
};


// forgot password
const forgotPassword=async(email:string)=>{
  const userInfo=await prisma.user.findUnique({
    where:{
       email:email,
       status:userStatus.ACTIVE
    }
  })

  if(!userInfo){
    throw new Error("User not vaild,check your Email")
  }
  
  const resetPasswordToken=jwtHelpers.generateToken(
    {
     email:userInfo.email,
     role:userInfo.role
    },
    config.jwt.secret as Secret,
    config.jwt.resetTokenExpiration
)
 const resetPasswordLink=config.jwt.resetPasswordLink +`?userId=${userInfo.id}&token=${resetPasswordToken}`
await emailSender(userInfo.email,`
  <div>
     <p>Dear User</p>
     <p>Your Password Reset Link
       <a href=${resetPasswordLink}>
         <button>Reset Password</button>
       </a>
     </p>
  </div>
  `)
}


// reset password
const resetPassword=async(token:any,data:any)=>{
   await prisma.user.findUniqueOrThrow({
      where:{
          id:data.id,
          status:userStatus.ACTIVE
      }
  })
  const isVaildToken=jwtHelpers.varifyToken(token,config.jwt.secret as string)

  if(!isVaildToken){
      throw new ApiError(httpStatus.FORBIDDEN,"Forbidden")
  }
  // hash password
  const password = await bcrypt.hash(data.password, 12);

  await prisma.user.update({
      where: {
          id:data.id
      },
      data: {
          password
      }
  })
}



export const authService = {
  loginAuth,
  refreshToken,
  resetPassword,
  changePassword,
  forgotPassword
};
