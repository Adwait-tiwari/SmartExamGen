export const generateToken = (user) => {
    console.log("SESSION_SECRET:", process.env.SESSION_SECRET); // ✅ for debugging
    return jwt.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
        picture: user.picture || null,
        isGoogle: Boolean(user.googleId),
    }, process.env.SESSION_SECRET, { expiresIn: '1h' });
};