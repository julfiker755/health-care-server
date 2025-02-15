import ApiCustomError from "../../errors/ApiCustomError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import emailSender from "../../../helpers/emailSender";
import ApiError from "../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { userStatus } from "@prisma/client";
import { Secret } from "jsonwebtoken";
import httpStatus from "http-status";
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

  if(!userData){
    throw new ApiCustomError("user email Error", [{
      field: "email",
      code: "invalid_type",
      message: "User not found",
    }]);
  }

  const isCorrectPassword: Boolean = await bcrypt.compare(
    data.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new ApiCustomError("user Password Error", [{
      field: "password",
      code: "invalid_type",
      message: "Password is not vaild",
    }]);
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
    decodedToken = jwtHelpers.varifyToken(token, config.jwt.secret as Secret,);
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
    throw new ApiCustomError("user email Error", [{
      field: "email",
      code: "invalid_type",
      message: "User not found",
    }]);
  }

  const resetPasswordToken = jwtHelpers.generateToken(
    {
      email: userInfo.email,
      role: userInfo.role,
    },
    config.jwt.secret as Secret,
    config.jwt.resetTokenExpiration
  );
  const resetPasswordLink =
    config.jwt.resetPasswordLink +
    `?userId=${userInfo.id}&token=${resetPasswordToken}`;
  await emailSender(
    userInfo.email,
    `
  <table>
    <tr>
        <td>
            <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="max-width:670px; background:#fff; border-radius:3px; text-align:center; 
                            -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06); -moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);
                            box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding:0 35px;">
                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0; font-size:32px; font-family:'Rubik',sans-serif;">
                                        You have requested to reset your password
                                    </h1>
                                    <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; 
                                        border-bottom:1px solid #cecece; width:100px;">
                                    </span>
                                    <p style="color:#455056; font-size:15px; line-height:24px; margin:0;">
                                        We cannot simply send you your old password. A unique link to reset your
                                        password has been generated for you. To reset your password, click the
                                        following link and follow the instructions.
                                    </p>
                                    <a href=${resetPasswordLink}
                                        style="background:#20e277; text-decoration:none !important; font-weight:500; 
                                        margin-top:35px; color:#fff; text-transform:uppercase; font-size:14px; 
                                        padding:10px 24px; display:inline-block; border-radius:50px;">
                                        Reset Password
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>

  `
  );
};

// reset password
const resetPassword = async (token: any, data: any) => {
  await prisma.user.findUniqueOrThrow({
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
    throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
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
};

export const authService = {
  loginAuth,
  refreshToken,
  resetPassword,
  changePassword,
  forgotPassword,
};
