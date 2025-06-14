import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import passport from "passport";
import session from "express-session";
import "./config/passport.js"
import connectDB from "./config/db.js";
import questionRoutes from "./router/questionRouter.js";
import cookieParser from "cookie-parser";
import authRoutes from "./router/authRoutes.js"
import googleAuthRoutes from "./router/googleAuthRoutes.js"
import scoreRoutes from "./router/scoreRouter.js"

const app = express();

dotenv.config();
connectDB();


app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(session({ secret: 'keyboardcat', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send("<h1>Hello</h1>")
})

app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/google-auth', googleAuthRoutes);
app.use("/api/scores", scoreRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})