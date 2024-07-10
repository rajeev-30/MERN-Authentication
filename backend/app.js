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
const allowedOrigins = ["http://localhost:5173", "https://mern-authentication-wki0.onrender.com"];
const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true // Allow credentials
  };
  
  app.use(cors(corsOptions));

//api
app.use("/api/v1/user", userRoute);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

export default app
