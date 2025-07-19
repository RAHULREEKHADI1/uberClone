import captainModel from "../models/captain.model.js";

const createCaptain =async ({
    firstName,
    lastName,
    email,
    password,
    color,
    model,
    capacity,
    vehicleType
})=>{
    if (!firstName || !email || !password || !color || !model ||!capacity || !vehicleType) {
        throw new Error("All fields are required");
    }
    const captain =await captainModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        vehicle:{
            color,
            model,
            capacity,
            vehicleType,
        }
    }) 
    return captain;
}   
export default createCaptain;