import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import "./config/passport.js";
import connectDB from "./config/db.js";
import questionRoutes from "./router/questionRouter.js";
import authRoutes from "./router/authRoutes.js";
import googleAuthRoutes from "./router/googleAuthRoutes.js";
import scoreRoutes from "./router/scoreRouter.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Trust proxy (needed for Vercel/Netlify HTTPS cookies)
app.set("trust proxy", 1);

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // e.g. https://smartexamgen.netlify.app
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// Session setup
app.use(
    session({
        secret: process.env.SESSION_SECRET || "fallback_secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
        cookie: {
            secure: process.env.NODE_ENV === "production", // HTTPS only in production
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get("/", (req, res) => {
    res.send("<h1>Hello from Vercel Backend 👋</h1>");
});

app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/google-auth", googleAuthRoutes);
app.use("/api/scores", scoreRoutes);

// ✅ Export for Vercel
export default app;

// ✅ For local dev only
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}