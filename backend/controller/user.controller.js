import User from "../models/users.model.js";
import { validationResult } from "express-validator";
import createUser from '../services/user.services.js';
import blacklistToken from "../models/blacklistToken.model.js";

const registerUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullName,email,password} = req.body;
    
    const isUserExistAlready = await User.findOne({email});
    if(isUserExistAlready){
        return res.status(400).json({message:"User already exist"})
    }
    const hashPassword = await User.hashPassword(password);

    const user = await createUser({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hashPassword
    });
    const token = user.generateAuthToken();
    res.status(201).json({token,user});
}

export default registerUser;

export const loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({errors:errors.array()})
    }
    const {email,password} = req.body;
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json("Invalid email and password");
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json("Invalid password");
    }
    const token = user.generateAuthToken();
    res.cookie('token',token);
    res.status(200).json({token,user});
}

export const getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user)
}

export const logoutUser = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistToken.create({token});

    res.clearCookie('token');
    res.status(200).json({message:"User logged out"});
}