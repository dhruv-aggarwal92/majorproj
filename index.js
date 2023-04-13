const express = require('express');
const app = express();
const port = 8000;

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