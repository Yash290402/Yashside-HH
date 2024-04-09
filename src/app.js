import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();



// Serve static files from the 'frontend' directory
app.use(express.static('frontend'));

// Add a MIME type for JavaScript files
express.static.mime.define({ 'application/javascript': ['js'] });

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(bodyParser.json());

app.use(express.json({ limit: "20kb" }))

app.use(express.urlencoded({ extended: true, limit: "20kb" }))

app.use(express.static("public"))

app.use(cookieParser())


//routes

import userRouter from './routes/user.routes.js'
import bodyParser from "body-parser";


//routes declarations
app.use("/api/v1/users", userRouter)

//example :http://localhost:8000/api/v1/users/register

export { app }