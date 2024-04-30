import pg from 'pg'

const db = new pg.Pool("postgres://usertodos:odfxgX4nfBLu8LXAka2cHuiycqLybZAZ@dpg-coo8s7ev3ddc738itpeg-a.oregon-postgres.render.com/todos_mpxo")
//     {
//     host:process.env.DB_HOST,
//     port:process.env.DB_PORT,
//     user:process.env.DB_USER,
//     password:' b',
//     database:process.env.DB_DATABASE,
//     }
// )

export default db;