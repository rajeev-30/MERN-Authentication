import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"

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
            return res.status(401).json({
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

        return res.status(201).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log("Login Error: ", error);
    }
}