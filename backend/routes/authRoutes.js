import express from 'express'
import {LoginValidation, requestMailValidation, resetPassValidation, SignupValidation}  from '../middlewares/zodValidation.js';
import login from '../controllers/auth/login.js';
import signup from "../controllers/auth/signup.js"
import logout from '../controllers/auth/logout.js';
import requestMail from '../controllers/auth/requestMail.js'
import resetPass from "../controllers/auth/resetPass.js"

const router = express.Router();

router.post("/login",LoginValidation,login);
router.post("/signup",SignupValidation,signup);
router.post("/logout",logout);

router.post("/forgotPassword",requestMailValidation, requestMail);
router.post("/resetPassword",resetPassValidation,resetPass)

export default router;

