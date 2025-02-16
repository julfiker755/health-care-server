import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path:path.join(process.cwd(),".env")})


export default {
    env:process.env.NODE_ENV,
    port:process.env.PORT,
    jwt:{
       secret:process.env.JWT_SECRET,
       accessTokenExpiration:process.env.ACCESS_TOKEN_EXPIRATION,
       refreshTokenExpiration:process.env.REFRESH_TOKEN_EXPIRATION,
       resetPasswordExpiration:process.env.RESET_PASSWORD_EXPIRATION,
       resetPasswordLink:process.env.RESET_PASSWORD_LINK,
    }
}