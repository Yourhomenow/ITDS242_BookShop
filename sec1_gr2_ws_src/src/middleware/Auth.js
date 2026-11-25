import { config } from "../config/index.js";
import { getCookie } from "../utils/login/cookie.js";
import jwt from 'jsonwebtoken';


const COOKIE_NAME = "access_token";

export function requireAuth(req, res, next){
  const token = getCookie(req, COOKIE_NAME)

  if(!token){
    return res.status(401).json({
      error: "Not authenticated",
    })
  }

  try {
    const payload = jwt.verify(token, config.JWT_SECRET, {
      algorithms: ["HS256"],
    })

    if (
      typeof payload !== "object" ||
      typeof payload.sub !== "string"
    ){
      return res.status(401).json({
        error: "Invalid token"
      });
    }

    req.auth = {
      AdminID: payload.sub
    };

    next();
  }catch{
    console.error("JWT verify failed:", err.message);
    return res.status(401).json({
      error: "Invalid or expired token"
    })
  }
}
