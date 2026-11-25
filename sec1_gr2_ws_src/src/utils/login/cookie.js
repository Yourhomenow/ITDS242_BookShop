import { config } from "../../config/index.js";
import jwt from "jsonwebtoken"



export function getCookie(req,name){
  const header = req.headers.cookie || "";

  for(const item of header.split(";")){
    const [key, ...value] = item.trim().split("=")

    if(key === name){
      return value.join("=")
    }
  }

  return null
}


export function generateToken(user){
  return jwt.sign({
    sub: String(user.AdminID),
  },
  config.JWT_SECRET,
  {
    algorithm: "HS256",
    expiresIn: "15m",
  }
)
}