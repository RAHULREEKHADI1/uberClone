import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";
import createCaptain from "../services/captain.services.js";
import blacklistToken from "../models/blacklistToken.model.js";


const registerCaptain = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullName,email,password,vehicle} = req.body;

    const isCaptainAlreadyExist =await captainModel.findOne({email})
    if(isCaptainAlreadyExist){
        return res.status(400).json({message:"Captain already exist"})
    }
    const hashedPassword = await captainModel.hashPassword(password);
    
    const captain =await createCaptain({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hashedPassword,
        color:vehicle.color,
        model:vehicle.model,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    })
    const token = captain.generateAuthToken();
    res.status(201).json({captain,token});
}
export default registerCaptain;

export const loginCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors=>errors.array());
    }
    const {email,password} = req.body;
    const captain =await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message:"Invalid email or password"})
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid password"})
    }

    const token = captain.generateAuthToken();
    res.cookie('token',token);    
    res.status(200).json({captain,token});
}

export const getCaptainProfile = async(req,res,next)=>{
    res.status(200).json(req.captain);
}

export const logoutCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistToken.create({token});

    res.clearCookie('token');
    return res.status(200).json({message:"Captain logged out"})
}