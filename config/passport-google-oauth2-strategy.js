const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID:"169278005747-s60jrq2u6m94dn5sdsbodsd1vdpoebud.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:9000/users/auth/google/callback",
    },
    async function(accessToken, refreshToken, profile, done){
        try{
            let user = await User.findOne({email: profile.emails[0].value})
                // console.log(profile)
                if(user){
                    module.exports.user = user;
                    return done(null, user);
                }else{
                    user = await User.create({
                        name:profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    })
                    
                    console.log(user)
                    module.exports.user = user;
                    return done(null, user)
                }
               
        }catch(err){
            console.log('error in google strategy-passport',err);
            return;
        }
        
    
    }

))

module.exports = passport;