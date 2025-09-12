import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
        picture: user.picture || null, // Include picture if available
        isGoogle: Boolean(user.googleId), // Set true if googleId exists
    },
        process.env.SESSION_SECRET, { expiresIn: '1h' }
    );
};