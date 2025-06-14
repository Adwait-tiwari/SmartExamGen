import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: function () {
            return !this.googleId;
        },
    },

    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },

    picture: {
        type: String, // ✅ added to store Google profile picture URL
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('UserDetail', userSchema);