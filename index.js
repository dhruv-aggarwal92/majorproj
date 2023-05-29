const express = require('express');
const app = express();
const cookieParsar = require('cookie-parser');
const port = 9000;
app.use(express.urlencoded());
app.use(cookieParsar());

const db = require('./config/mongoose');     //conect mongoose file with index.js
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-st');

app.use(express.static('assets')); 
app.set('view engine','ejs');
app.set('views','./view')

app.use(session({
    name:"codial",
    secret:"abcd",
    saveUninitialized:false,
    resave:false,
    cokkie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// app.post('/users/createsession',
//   passport.authenticate('local', { failureRedirect: '/users/log-in', failureMessage: true }),
//   function(req, res) {
//     res.redirect('/users/profile');
// });
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    else
    console.log(`Server is succesfully running on port: ${port}`);
})