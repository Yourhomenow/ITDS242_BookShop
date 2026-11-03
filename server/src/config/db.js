import mysql from "mysql2/promise"
import { config } from "./index.js";

const db = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    port: config.database.port
})

const checkConnection = async () => {
    try {  
        const [rows] = await db.query('SELECT * FROM BOOK')
        return rows
    } catch (err){
        console.error(`Initiate Connection Fail: `, err)
    }
}

checkConnection()

export const query = (text, param) => db.query(text, param);