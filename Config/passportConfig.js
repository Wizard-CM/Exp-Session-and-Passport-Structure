import localStrategy from "passport-local";
import { user_Model } from "../db.js";


export const initializingPassport = (passport) => {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        const user = await user_Model.findOne({ username: username });
        if (!user) return done(null, false);
        // done(error, user)

        if (user.password !== password) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    })
  );
  // Serialize leh user ko id create garcha
  passport.serializeUser((user, done) => {
      done(null, user.id);
    });
    // dserialize leh user ko id find garcha
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await user_Model.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
