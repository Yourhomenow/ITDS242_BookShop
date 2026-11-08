import mysql from "mysql2/promise"
import { config } from "./index.js";

const db = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    port: config.database.port
})

export const checkConnection = async () => {
    try {  
        const [rows] = await db.query('SELECT * FROM BOOK')
        return rows.length 
    } catch (err){
        console.error(`Initiate Connection Fail: `, err)
    }
}



export const query = (text, param) => db.query(text, param);