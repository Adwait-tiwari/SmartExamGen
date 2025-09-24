import express from 'express';
import passport from 'passport';
import { generateToken } from '../utils/auth.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();


router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

// Google callback route
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        // Add isGoogle: true here
        const token = generateToken(req.user);
        // Redirect to your frontend with the token
        res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    }
);


export default router;