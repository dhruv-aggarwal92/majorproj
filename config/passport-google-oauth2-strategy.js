const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const env = require('./environment');
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_call_back_url,
    },
    async function(accessToken, refreshToken, profile, done){
        try{
            // find a user
            let user = await User.findOne({email: profile.emails[0].value})
                // console.log(profile)
                if(user){
                    // if found, set this user as req.user
                    module.exports.user = user;
                    return done(null, user);
                }else{
                    // if not found, create the user and set it as req.user
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