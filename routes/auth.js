const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/auth/google',
  passport.authenticate('google', {scope: ['email', 'profile']}));

router.get('/auth/google/callback',
  passport.authenticate('google', { 
    successRedirect:'/',
    failureRedirect: '/auth/falure' 
  }))

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


module.exports = router