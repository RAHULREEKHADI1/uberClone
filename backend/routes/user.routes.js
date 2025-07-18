import express from 'express';
import {body} from 'express-validator';
import registerUser, { getUserProfile, loginUser } from '../controller/user.controller.js';
import authMiddlewares from '../middlewares/auth.middlewares.js';

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

router.post('/login',[
    body('email')
        .isEmail()
        .withMessage('Invalid email'),
    body('password')
        .isLength({min:6})
        .withMessage('Password must be atleast 6 characters long')
],loginUser)

router.get('/profile',authMiddlewares,getUserProfile);

export default router;