import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cookieParser from "cookie-parser";

import "../config/passport.js";
import connectDB from "../config/db.js";
import authRoutes from "../router/authRoutes.js";
import googleAuthRoutes from "../router/googleAuthRoutes.js";
import questionRoutes from "../router/questionRouter.js";
import scoreRoutes from "../router/scoreRouter.js";

dotenv.config();

// Connect DB
connectDB();

const app = express();

// Trust proxy (needed for secure cookies on Vercel/Netlify)
app.set("trust proxy", 1);

// Middleware
app.use(cors({
    origin: [
        process.env.FRONTEND_URL, "http://localhost:5173"
    ],
    credentials: true, // ✅ allow cookies/sessions
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());
app.use(cookieParser());

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
    res.send("✅ Backend is running on Vercel!");
});

app.use("/api/auth", authRoutes);
app.use("/api/google-auth", googleAuthRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/scores", scoreRoutes);

// ✅ No app.listen() → Vercel handles serverless
export default app;