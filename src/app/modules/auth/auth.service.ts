import { jwtHelpers } from "../../../helpers/jwtHelpers";
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
const loginAuth = async (data:authProps) => {
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

export const authService = {
  loginAuth,
  refreshToken,
};
