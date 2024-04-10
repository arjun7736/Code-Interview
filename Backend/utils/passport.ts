import passport from "passport"

const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    scope:["profile","email"]
  },
  function(accessToken:string, refreshToken:string, profile:any, cb:any) {
    cb(null, profile)
    }
));
passport.serializeUser((user,done)=>{
  done(null,user)
})
passport.deserializeUser((user:any,done)=>{
  done(null,user)
})