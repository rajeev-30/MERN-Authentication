import express from "express";
import { Login, Logout, Register, getAllUsers, getProfile, updatePassword } from "../controllers/user.controller.js";
import { isAuthorized } from "../db/auth.js";


const router = express.Router()

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(isAuthorized, Logout);
router.route("/updatepassword").put(isAuthorized, updatePassword);
router.route("/allusers").get(isAuthorized, getAllUsers);
router.route("/profile/:id").get(isAuthorized, getProfile);

export default router