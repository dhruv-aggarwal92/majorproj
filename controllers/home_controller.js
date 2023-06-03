const pass = require("../config/passport-local-st")
const post = require("../models/post");

module.exports.home = function(req,res){
    // console.log(req.cookies);
    res.cookie('user_id',24);
    return res.render('home',{
        title: 'MYproj',
        cust: pass.user
    });
}

