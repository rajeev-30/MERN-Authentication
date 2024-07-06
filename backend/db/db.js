import mongoose from "mongoose";
import dotenv from "../utils/dotenv.js"

const ConnectDB = () =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDB Conneted");
    })
    .catch((err)=>{
        console.log("Connnection error: ", err);
    })
}

export default ConnectDB