import express from 'express';
import {body} from 'express-validator';
import registerUser from '../controller/user.controller.js';

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
        .withMessage('Password must be atleast 6 characters long')
],
    registerUser
)

export default router;