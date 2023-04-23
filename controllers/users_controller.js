const User = require("../models/users");

module.exports.profile = function(req, res){
    return res.render("<h1>User profile</h1>");
}
module.exports.user_sign_up = function(req, res){
    return res.render("user_sign_up",{
        title: "Codial | Sign Up"
    });
}
module.exports.user_log_in = function(req, res){
    return res.render("user_log_in",{
        title: "Codial | Log In"
    });
}
module.exports.create = async(req,res)=>{
    if(req.body.password!=req.body.confirm_password){
        return res.redirect("back");
    }
    try{
        console.log("abc");
        const findit = await User.findOne({email: req.body.email});
            if(!findit){
                // try{
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
                    return res.redirect('/users/log-in');
                //  }
                //  catch(err){
                //     console.log("error in creating in signin username");
                //     return;
                // }
            }
            else{
                return res.redirect("back");
            }
        // })
    }catch(err){
        console.log('error in finding user in signing up'); 
        return;
    }
}
