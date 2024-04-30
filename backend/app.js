import express from 'express'
import cors from 'cors'
import handleErrors from './src/middlewares/handleError.js';
import router from './src/router/todo-router.js';
const app = express();

app.use(cors())


// parsing the json data
app.use(express.json());


app.use('/todos',router)


app.use(handleErrors);

export default app;