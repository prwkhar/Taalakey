import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()
 
var corsOptions = {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
   
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors(corsOptions))
  
//routes importing
import router from "./routes/user.routes.js"
import router2 from "./routes/password.routes.js"

//routes declaration
app.use("/api/v1/users",router);
app.use("/api/v1/password",router);

export {app}