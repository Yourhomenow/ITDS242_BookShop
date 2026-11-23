import { query } from "../config/db.js";
import bcrypt from "bcrypt"

//Admin API
export const getAdmins = async ()=> {
   try{
   const result = await query("SELECT AdminID,Username,Status FROM ADMIN;");
   console.log(`GET All admins : `,result[0])
   return result[0]
   }catch(err){
      console.error(`DB error: ${err}`)
      throw err
   }
}

export const getAdminsExceptOne = async (id)=> {
   try{
      const result = await query("SELECT AdminID,Username,Status FROM ADMIN WHERE AdminID != ?;",id)
      console.log(`GET admins that don't have this ID (${id}): `,result[0])
      return result[0]
   }catch(err){
      console.error(`DB error: ${err}`)
      throw err
   }
}

export const getAdmin = async (id)=>{
   try{
      const result = await query("SELECT AdminID,Username,Status FROM ADMIN WHERE AdminID = ?;",id)
      console.log(`GET A admin : `,result[0][0])
      return result[0][0]
   }catch(err){
      console.error(`DB error: ${err}`)
      throw err
   }
}

export const getAdminByName = async (Username)=>{
   try{
      const result = await query("SELECT * FROM ADMIN WHERE Username = ?;",Username)
      console.log(`GET A admin : `,result[0][0])
      return result[0][0]
   }catch(err){
      console.error(`DB error: ${err}`)
      throw err
   }
}


export const addAdmin = async (data)=>{
   try{
      const q = 'INSERT INTO `ADMIN` (`Username`, `Password`, `Status`) VALUES (?)'
      const values = [
         data.Username,
         data.Password,
         "ACTIVE"
      ]

      return await query(q,[values])
   }catch(err){
      if(err.code === "ER_DUP_ENTRY"){
         console.error(`DB error: ${err}`)
         throw err
      }

      console.error(err)
      res.status(500).json({ error: "Internal server error" });
   }
}

export const deleteAdmin = async (id)=>{
   try{
      // console.log(id)
      const q = "DELETE FROM `ADMIN` WHERE AdminID = ?;"
      // console.log(q)
      const result = await query(q,[id])
      // console.log(Boolean(result[0].affectedRows))
      return Boolean(result[0].affectedRows)
   }catch(err){
      console.error("DB Error: ", err)
      throw err
   }
}


export const editAdmin = async (id,data)=>{
   try{
      const q = "UPDATE `ADMIN` SET `Username` = ?, `Status` = ?, `Password` = ? WHERE AdminID = ?;"
      const values = [
         data.Username,
         data.Status,
         await bcrypt.hash(data.Password,12),
         id
      ]
      const result = await query(q,values)
      return result
   }catch(err){
      console.error("DB Error: ", err)
      throw err
   }
}