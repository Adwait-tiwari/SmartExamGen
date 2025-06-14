// config/passport.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import GoogleUser from '../modals/GoogleUser.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/api/google-auth/google/callback',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo', // ensure photo is included
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("🔍 Google Profile Received:", JSON.stringify(profile, null, 2));

                let user = await GoogleUser.findOne({ googleId: profile.id });

                const pictureUrl =
                    profile &&
                        profile.photos &&
                        profile.photos[0] &&
                        profile.photos[0].value ?
                        profile.photos[0].value :
                        null;

                if (!user) {
                    user = new GoogleUser({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id,
                        picture: pictureUrl,
                    });

                    await user.save();
                } else {
                    // 🔥 Only update if user has no picture yet
                    if (!user.picture && pictureUrl) {
                        user.picture = pictureUrl;
                        await user.save();
                    }
                }

                done(null, user);
            } catch (err) {
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