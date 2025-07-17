import express from 'express'

const app = express();


app.get('/',(req,res)=>{
    console.log("hello world");
})

export default app;