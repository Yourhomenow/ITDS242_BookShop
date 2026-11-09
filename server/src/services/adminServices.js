import { query } from "../config/db.js";

//Admin API
export const getAdmins = async ()=> {
   const result = await query("SELECT * FROM BOOK");
   // console.log(result[0])
   return result[0]
}
