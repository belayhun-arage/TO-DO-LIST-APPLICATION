import express from 'express'

const app = express();

// parsing the json data
app.use(express.json);

export default app;