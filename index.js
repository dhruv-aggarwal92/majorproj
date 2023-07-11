const express = require('express');
const env = require('./config/environment')

const logger = require('morgan')
const app = express();
require('./config/view-helpers')(app)
const cookieParsar = require('cookie-parser');
const port = 9000;
const expressLayouts = require('express-ejs-layouts');         //header and footers etc.

const db = require('./config/mongoose');     //conect mongoose file with index.js
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-st');
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoogle = require('./config/passport-google-oauth2-strategy')
const MongoStore = require('connect-mongo');          //used for store the session i.e. login data even if we restart the server

const flash = require("connect-flash");
const customMware = require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer  = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server server is listening on port 5000')
const path = require('path');

// var sass = require('node-sass');                //sass
// sass.render({
//     file: layout.scss,
//     [, options..]
//   }, function(err, result) { /*...*/ });

app.use(express.urlencoded({extended: false}));
app.use(cookieParsar());

app.use(express.static(env.asset_path)); 
//make the uploads path available to browser
app.use('/uploads',express.static(__dirname+'/uploads')) 
app.use(logger(env.morgan.node, env.morgan.options));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine','ejs');
app.set('views','./view');

// let store = new MongoStore.create({
//     mongoUrl: process.env.MONGO_URI,
//     collection: "sessions"
//  });

app.use(session({
    name:"codeial",
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
    // store: MongoStore.create(                        //didn't log out from our page if we rerun the server
    //     {
    //         mongoUrl: process.env.MONGO_URI,
    //         autoRemove: 'disabled'
    //     },
    //     function(err){
    //         console.log(err || 'connect-mongodb setup ok');
    //     }
    // )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);    //use to use user in views
app.use(flash());
app.use(customMware.setFlash);

app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    else
    console.log(`Server is succesfully running on port: ${port}`);
})