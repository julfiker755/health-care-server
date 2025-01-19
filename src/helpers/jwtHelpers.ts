import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { authProps } from '../types'


const generateToken=(payload:any,secret:Secret,expiresIn:any)=>{
    const token=jwt.sign(payload,secret,
 {
     algorithm:"HS256",
     expiresIn:expiresIn
 } 
)
return token
}


const varifyToken=(token:string,secret:Secret)=>{
   return jwt.verify(token, secret) as JwtPayload
}


export const jwtHelpers={
    generateToken,
    varifyToken
}