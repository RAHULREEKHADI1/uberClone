import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express'
import connectToDb from './db/db.js';
const app = express();

connectToDb();
app.use(cors());


app.get('/',(req,res)=>{
    res.send("hello world")
})

export default app;