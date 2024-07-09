import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import  jwt from "jsonwebtoken";
import dotenv from "../utils/dotenv.js";

export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        //Basic validation
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            })
        }

        const userName = await User.findOne({ username });
        const userEmail = await User.findOne({ email });

        if (userName) {
            return res.status(401).json({
                message: "Username already taken",
                success: false,
            })
        }
        if(userEmail) {
            return res.status(401).json({
                message: "Email id already exist",
                success:false
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 16);
        await User.create({
            name, username:username.toLowerCase(), email, password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully",
            status: true
        })
    } catch (e) {
        console.log(e);
    }
}

export const Login = async(req, res) =>{
    try {
        const {username, password} = req.body;

        if(!username || !password) {
            return res.status(401).json({
                message: "All fields are required",
                success:false
            })
        }

        const user = await User.findOne({username});
        
        if(!user){
            return res.status(40).json({
                message: "User doesn't exist",
                success: false
            })
        }
        const isPassMatch = await bcryptjs.compare(password,user.password);
        if(!isPassMatch){
            return res.status(401).json({
                message:"Invalid password",
                success:false
            })
        }
        const tokenData = {
            userId:user._id
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn:'1d'})

        return res.status(201).cookie("token", token, {httpOnly:true}).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log("Login Error: ", error);
    }
}

export const Logout = async(req,res) =>{
    const id = req.user
    const user = await User.findById(id);
    return res.status(200).cookie("token", "" ,{ expiresIn: new Date(Date.now()) }).json({
        message: `${user.name} Logged out successfully`,
        success: true
    })
}


export const updatePassword = async(req, res) =>{
    try {
        const id = req.user
        const {newPassword} = req.body;

        if(!newPassword){
            return res.status(400).json({
                message:"password is required",
                success: false
            })
        }
      
        const hashedPass = await bcryptjs.hash(newPassword, 16);
        await User.findByIdAndUpdate(id, {
            $set: {password: hashedPass}
        })

        return res.status(200).json({
            message:"Password updated successfully"
        })
    } catch (error) {
        console.log("Update password error: ", error);
    }
}

export const getAllUsers = async (req, res) =>{
    try {
        const users = await User.find();
        return res.status(201).json({
            message: "Got All users",
            users
        })
    } catch (error) {
        console.log("getAllUsers error: ", error);
    }
}

export const getProfile = async(req, res)=>{
    try {
        const id = req.params.id
        const user = await User.findById(id).select("-password")
        if(!user){
            return res.status(401).json({
                message: "User doesn't exist",
                success:false
            })
        }
        return res.status(201).json({
            message:"found user profile",
            user,
            success:true
        })
    } catch (error) {
        console.log("getProfile error: ", error);
    }
}