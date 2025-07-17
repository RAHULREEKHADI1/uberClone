import mongoose from "mongoose";


export default function connectToDb(){
    mongoose.connect(process.env.Db_connect,
        ).then(()=>{
        console.log("Connected to mongoDb")
    })
    .catch((err)=>{
        console.log(" Failed to connect to MongoDB:",err.message);
    })
}
