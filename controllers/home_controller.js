module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',01);
    return res.render('home',{
        title: 'MYproj'
    });
}