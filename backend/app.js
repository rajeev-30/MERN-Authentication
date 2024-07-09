import express from "express";
import dotenv from "./utils/dotenv.js"
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express()

const port = process.env.PORT || 8000

//parsing the data using middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

//Cors policy
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))

//api
app.use("/api/v1/user", userRoute);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

export default app
