import jwt from "jsonwebtoken"
import dotenv from "../utils/dotenv.js"

export const isAuthorized = (req, res, next) => {
    try {
        const token  = req.cookies?.token
        if(!token){
            return res.status(401).json({
                message:"User not logged in",
                success:false
            })
        }
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decode.userId;
        next();
    } catch (error) {
        res.status(401).cookie("token","", {expiresIn: new Date(Date.now())}).json({
            message:"Token has been expired",
        })
    }

}