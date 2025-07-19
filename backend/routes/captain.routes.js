import express from 'express';
import { body } from 'express-validator';
import registerCaptain, { getCaptainProfile, loginCaptain, logoutCaptain } from '../controller/captain.controller.js';
import { authCaptain } from '../middlewares/auth.middlewares.js';

const router = express.Router();
router.post('/register',[
     body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('fullName.firstName')
        .isLength({min:3})
        .withMessage("First name must be atleast 3 characters long"),
    body('password')
        .isLength({min:6})
        .withMessage('Password must be atleast 6 characters long'),
    body('vehicle.color')
        .isLength({min:3})
        .withMessage('Color must be 3 character long'),
    body('vehicle.model')
        .isLength({min:3})
        .withMessage("Plate must be 3 character long"),
    body('vehicle.capacity')
        .isInt(1)
        .withMessage('Capacity must be atleast 1'),
    body('vehicle.vehicleType')
        .isIn(['car','motorcycle','auto'])
        .withMessage('Invalid vehicle type')
],registerCaptain)

router.post('/login',[
    body('email')
        .isEmail()
        .withMessage("Invalid email"),
    body('password')
        .isLength({min:6})
        .withMessage('Password must be atleast 6 characters long')
],loginCaptain)

router.get('/profile',authCaptain,getCaptainProfile);
router.get('/logout',authCaptain,logoutCaptain);

export default router;