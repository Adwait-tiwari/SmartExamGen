import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import GoogleUser from '../modals/GoogleUser.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL, // 🔥 use env variable
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("🔍 Google Profile Received:", JSON.stringify(profile, null, 2));

                let user = await GoogleUser.findOne({ googleId: profile.id });

                let pictureUrl = null;
                if (profile && profile.photos && profile.photos.length > 0 && profile.photos[0].value) {
                    pictureUrl = profile.photos[0].value;
                }

                if (!user) {
                    user = new GoogleUser({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        picture: pictureUrl,
                    });

                    await user.save();
                } else {
                    if (!user.picture && pictureUrl) {
                        user.picture = pictureUrl;
                        await user.save();
                    }
                }

                done(null, user);
            } catch (err) {
                console.error("❌ Google Auth Error:", err);
                done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    GoogleUser.findById(id).then((user) => done(null, user));
});