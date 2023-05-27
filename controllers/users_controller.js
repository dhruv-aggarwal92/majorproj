const User = require("../models/users");

module.exports.profile = async(req, res)=>{
    
    if(req.cookies.user_id){
        try{
        const cook = await User.findById(req.cookies.user_id)
            if(cook){
                return res.render("profile",{
                    title: "profile",
                    user: cook
                });
            }
            else{
                return res.redirect("/users/log-in");
            }
        }catch(err){
            console.log("some cokkie error");
        }
    }
    return res.redirect("/users/log-in");
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

module.exports.createsession = async(req,res)=>{

    try{
        const findit2 = await User.findOne({email: req.body.email});
            if(findit2){
                if(findit2.password != req.body.password){
                    console.log("qwe");
                    return res.redirect('back');
                }
                res.cookie('user_id',findit2.id);
                return res.redirect('/users/profile');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('error in finding user in log in'); 
        return;
    }
}
module.exports.remove = function(req, res){
    // cookie = req.cookies;
    // for (var prop in cookie) {
    //     if (!cookie.hasOwnProperty(prop)) {
    //         continue;
    //     }    
    //     res.cookie(prop, '', {expires: new Date(0)});
    // }
    // res.redirect('/');
    return res.redirect("/");
}