import User from "../models/users.model.js";
import { validationResult } from "express-validator";
import createUser from '../services/user.services.js';

const registerUser = async(req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
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
