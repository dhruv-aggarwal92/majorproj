const User = require("../models/users");
const pass = require("../config/passport-local-st")

module.exports.profile = function(req, res){
    // console.log(pass.user);
    return res.render("profile",{
        title: "Codial | profile",
        cust: pass.user
    });
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
        const findit = await User.find({email: req.body.email});
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

module.exports.createsession = function(req, res){
        return res.redirect("/");
}

module.exports.destroysession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}