import captainModel from "../models/captain.model.js";
import User from "../models/users.model.js";
import jwt from 'jsonwebtoken';
import blacklistToken from "../models/blacklistToken.model.js";

const authUser = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const isBlacklisted = await blacklistToken.findOne({token:token})    
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }
        req.user = user;
        return next();
    }
    catch(err){
        res.status(401).json({ message: "Unauthorized"})
    }
}
export default authUser;

export const authCaptain = async(req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    const isBlacklisted = await blacklistToken.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if(!captain){
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }
        req.captain = captain;
        next();
    }
    catch(err){
        res.status(401).json({ message: "Unauthorized"})
    }
}