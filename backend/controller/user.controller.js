import User from "../models/users.model.js";
import { validationResult } from "express-validator";
import createUser from '../services/user.services.js';

const registerUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    console.log(req.body)
    const {fullName,email,password} = req.body;
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