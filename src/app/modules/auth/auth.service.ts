import { template } from "../../../helpers/emailTemplate";
import ApiCustomError from "../../errors/ApiCustomError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import emailSender from "../../../helpers/emailSender";
import prisma from "../../../shared/prisma";
import { userStatus } from "@prisma/client";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";


type authProps = {
  email: string;
  password: string;
};

// auth login
const loginAuth = async (data: authProps) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: data.email,
      status: userStatus.ACTIVE,
    },
  });

  if (!userData) {
    throw new ApiCustomError("user email Error", [
      {
        field: "email",
        code: "invalid_type",
        message: "User not found",
      },
    ]);
  }

  const isCorrectPassword: Boolean = await bcrypt.compare(
    data.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new ApiCustomError("user Password Error", [
      {
        field: "password",
        code: "invalid_type",
        message: "Password is not vaild",
      },
    ]);
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
    decodedToken = jwtHelpers.varifyToken(token, config.jwt.secret as Secret);
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
const forgotPassword = async (email: string) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      email: email,
      status: userStatus.ACTIVE,
    },
  });

  if (!userInfo) {
    throw new ApiCustomError("user email Error", [
      {
        field: "email",
        code: "invalid_type",
        message: "User not found",
      },
    ]);
  }

  const resetPasswordToken = jwtHelpers.generateToken(
    {
      id: userInfo.id,
      email: userInfo.email,
      role: userInfo.role,
    },
    config.jwt.secret as Secret,
    config.jwt.resetPasswordExpiration
  );

  const resetPasswordLink =
    config.jwt.resetPasswordLink + `?token=${resetPasswordToken}`;
  await emailSender(userInfo.email, template(resetPasswordLink));
};



// reset password
const resetPassword = async (token: any, data: any) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      id: data.id,
      status: userStatus.ACTIVE,
    },
  });
  const isVaildToken = jwtHelpers.varifyToken(
    token,
    config.jwt.secret as string
  );

  if (!isVaildToken) {
    throw new ApiCustomError("token expire", [
      {
        field: "token",
        code: "invalid_type",
        message: "Your Link is expire",
      },
    ]);
  }
  // hash password
  const password = await bcrypt.hash(data.password, 12);

  await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      password,
    },
  });
  return {
    email: userInfo.email,
  };
};

export const authService = {
  loginAuth,
  refreshToken,
  resetPassword,
  changePassword,
  forgotPassword,
};
