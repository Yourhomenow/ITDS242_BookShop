import * as adminService from "../services/adminServices.js"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/login/cookie.js";

const COOKIE_NAME = "access_token";
const IS_PRODUCTION = process.env.NODE_ENV === "production"
const cookieOptions = {
  httpOnly: true,
  secure: IS_PRODUCTION,
  sameSite: "lax",
  path: "/",
};

export const register = async (req, res)=>{
  try{
    const { Username, Password } = req.body;
    console.log(Username, Password)
    if(
      typeof Username !== "string" ||
      typeof Password !== "string" 
    ){
      return res.status(400).json({
        error: "Invalid Username and Password"
      })
    }

    const passwordHash = await bcrypt.hash(Password,12)

    const newAdmin = await adminService.addAdmin({Username,Password : passwordHash})
    console.log(newAdmin)

    res.status(201).json({
      message: "Register successfully",
    })
  }catch(err){
    console.error(err)
    return res.status(500).json({
      message: "Internal error"
    })
  }
}

export const login = async (req,res, next)=>{
  try {
    const {Username, Password} = req.body;
    
    // if(
    //   typeof Username !== "string" ||
    //   typeof Password !== "string" 
    // ){
    //   return res.status(400).json({
    //     error: "Invalid credentials"
    //   })
    // }

    const user = await adminService.getAdminByName(Username)
    console.log('Have user: ', !user)
    console.log('compare : ', !(await bcrypt.compare(Password, user.Password)))

    if(
      !user ||
      !(await bcrypt.compare(Password, user.Password))
    ){
      return res.status(401).json({
        error: "Invalid credentials"
      })
    }

    const token = generateToken(user)
    
    res.cookie(COOKIE_NAME, token, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    })

    res.json({
      message: "Logged in",
      admin:{
        AdminID: user.AdminID,
        Username: user.Username,

      }
    })
  }catch(err){
    next(err)
  }
}

export const me = async (req,res)=>{
  res.json({
    AdminID: req.auth.AdminID
  })
}

export const logout = (req,res)=>{
  res.clearCookie(COOKIE_NAME, cookieOptions)

  res.json({
    message: "Logged out locally"
  })
}