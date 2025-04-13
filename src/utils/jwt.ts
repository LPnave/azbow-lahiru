import jwt from "jsonwebtoken";
import appConfig from "../config";

const { JWT_ACCESS_TOKEN_EXP, JWT_REFRESH_TOKEN_EXP,JWT_ALG, JWT_TOKEN_SECRET} = appConfig

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, JWT_TOKEN_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXP,
      algorithm: 'HS256'
    });
  };
  
  export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, JWT_TOKEN_SECRET, {
      expiresIn: JWT_REFRESH_TOKEN_EXP,
      algorithm: 'HS256'
    });
  };
  
  export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_TOKEN_SECRET);
  };