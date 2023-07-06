const fs =require('fs')
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'abcd',
    db: 'majorproj_db',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:'daggarwal4_be21@thapar.edu',
            //now here gmail does not allow any workspace to use them so we need to generate a app password so 
            pass:'pwmlncwkjydowhrv'
        }
    },
    google_client_id:"169278005747-s60jrq2u6m94dn5sdsbodsd1vdpoebud.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url:"http://localhost:9000/users/auth/google/callback",
    jwt_secret: "codeial",
    morgan:{
        node:'dev',
        options:{stream:accessLogStream}    
    }
}
const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user:process.env.CODEIAL_GMAIL_USERNAME,
            //now here gmail does not allow any workspace to use them so we need to generate a app password so 
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    //"169278005747-s60jrq2u6m94dn5sdsbodsd1vdpoebud.apps.googleusercontent.com",
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    //"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",
    google_call_back_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    //"http://rohti.in/users/auth/google/callback",
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan:{
        node:'combine',
        options:{stream:accessLogStream}
    }
}
// module.exports = production;
module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);