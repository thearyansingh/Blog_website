import express from "express"
import { allAdmin, login, logout, myProfile, signUp } from "../Controller/User.controller.js"
import { isAdmin, isAuthenticated } from "../midellware/authUser.js";
const router=express.Router();

router.post('/signup',signUp);
// router.post('/login',login);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);
router.get("/my-profile",isAuthenticated,myProfile);
router.get("/alladmin",allAdmin);




export default router;