const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');
// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true            //this allow us to send a req argument in next async function // use it for show notification
    },
    async(req, email, password, done)=>{
        // find a user and establish the identity
        try{
        const user = await User.findOne({email: email})
        module.exports.user = user;
            if (!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null, false);   
            }
            return done(null, user);
        }
    catch(err){
            console.log('Error in finding user --> Passport');
            req.flash('error',err);

            return done(err);
    }
    }

));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
//old methord..................
// passport.deserializeUser(function(id, done){
//     const user = User.findById(id, function(err, user){
//         if(err){
//             console.log('Error in finding user --> Passport');
//             return done(err);
//         }

//         return done(null, user);
//     });
// });

//new methord...................
passport.deserializeUser(async(id, done)=>{
    const user = User.findById(id);
    try{
        return done(null, user);
    }
    catch(err){
        console.log('Error in finding user --> Passport');
        return done(err);
    }
});

//check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/log-in');
}
passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}
passport.islogin = function(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile")
    }
    return next();
}
passport.logedin = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect("/");
    }
}
module.exports = passport;
