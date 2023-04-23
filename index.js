const express = require('express');
const app = express();
const cookieParsar = require('cookie-parser');
const port = 9000;
app.use(express.urlencoded());
app.use(cookieParsar());

const db = require('./config/mongoose');     //conect mongoose file with index.js

app.use(express.static('assets'));
app.set('view engine','ejs');
app.set('views','./view')
app.use('/',require('./routes'))

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server: ${err}`);
    }
    else
    console.log(`Server is succesfully running on port: ${port}`);
})