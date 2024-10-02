import express from "express"
import { signUp } from "../Controller/User.controller.js"
const router=express.Router();

router.post('/signup',signUp);
// router.post('/login',login);


export default router;