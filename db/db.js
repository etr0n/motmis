import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'
const Pool = pg.Pool

//add restrictions
//add end pool
const db = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
})

export default db