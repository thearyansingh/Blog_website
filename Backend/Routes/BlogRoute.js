import express from "express"
import { allblog, BlogById, createBlog, deleteBlog, MyBlog, UpdateBlog } from "../Controller/BlogController.js";
import { isAdmin, isAuthenticated } from "../midellware/authUser.js";

const router=express.Router();

router.post('/create',isAuthenticated,isAdmin("admin"),createBlog);
router.delete('/delete/:id',isAuthenticated,isAdmin("admin"),deleteBlog);
router.get('/get-blog',allblog);
router.get('/getBlog/:id',isAuthenticated,BlogById);
router.get('/myBlog',isAuthenticated,isAdmin("admin"),MyBlog);
router.put('/updateBlog/:id',isAuthenticated,isAdmin("admin"),UpdateBlog);

export default router;