import passport from "passport";
import  {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { User } from "../models/userModel.js";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5500/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const userEmail = profile.emails[0].value;

      let user = await User.findOne({ email: userEmail });

      if (user) {
        user.googleId = profile.id;
        user.isLoggedIn = true;
        user.avatar = profile.photos[0].value;
        await user.save();
      } else {
        user = await User.create({
          googleId: profile.id,
          username: profile.displayName,
          email: userEmail,
          avatar: profile.photos[0].value,
          isLoggedIn: true,
          isVerified: true
        });
      }
      return cb(null, user);
    } catch (error) {
      console.error("Passport Error:", error);
      return cb(error, null);
    }
  }
));