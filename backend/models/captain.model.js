import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            requried:true,
            minlength:[3,"First name must be atleast 3 characters long"]
        },
        lastName:{
            type:String,
            minlength:[3,"Last name must be atleast 3 characters long"]
        }
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'Color must be 3 character long']
        },
        model:{
            type:String,
            required:true,
            minlength:[3,'Plate must be 3 character long']
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,"Capacity must be atleast 1"]
        },
        vehicleType:{
            type:String,
            enum:['car','motorcycle','auto'],
            required:true,
        }
    },
    location:{
        lat:{
            type:Number
        },
        long:{
            type:Number
        }
    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;   
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const captain = mongoose.model('captain',captainSchema);
export default captain;