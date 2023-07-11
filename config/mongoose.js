const mongoose = require('mongoose');
const env =  require('./environment')
// mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);
mongoose.connect(`mongodb://103.235.106.226:2737/${env.db}`);
const db= mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('successfully connected to database');
});

module.exports = db;