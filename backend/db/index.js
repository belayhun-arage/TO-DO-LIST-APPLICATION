import pg from 'pg'

const db = new pg.Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:' b',
    database:process.env.DB_DATABASE,
})

export default db;