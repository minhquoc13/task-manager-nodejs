const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: '425889203591-q38bsjs6mrmjv4nmqpbmfn1mn03rgvdj.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "/auth/google/callback"    
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile)
  }
));

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})