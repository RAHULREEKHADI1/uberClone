import dotenv from 'dotenv';
dotenv.config({quiet:true});
import cors from 'cors';
import express from 'express'
import cookieParser from 'cookie-parser';
import connectToDb from './db/db.js';
import userRoute from './routes/user.routes.js';
import captainRoute from './routes/captain.routes.js';

const app = express();

connectToDb();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send("hello world")
})
app.use('/users',userRoute)
app.use('/captains',captainRoute);

export default app;