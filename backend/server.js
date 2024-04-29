import 'dotenv/config'
import app from "./app.js";
import runMigrations from './db/migrations/index.js';

async function start(){

    await runMigrations();

    const port = process.env.PORT || 3000;

    app.listen(port,()=>{
        console.log(`Server running on port ${port}`);
    })
}
start()