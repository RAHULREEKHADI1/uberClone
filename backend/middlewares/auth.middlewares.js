import User from "../models/users.model.js";
import jwt from 'jsonwebtoken';

const authMiddleware = async (req,res,next)=>{
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    if(!token){
        res.status(401).json({message:"Unauthorized"});
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
export default authMiddleware;