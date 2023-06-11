const User = require("../models/users");
const pass = require("../config/passport-local-st");


module.exports.update = async(req,res)=>{
    try{
        
    if(pass.user.id == req.params.id){
            const user_update = await User.findByIdAndUpdate(req.params.id,{name:req.body.name, email:req.body.email});
            return res.redirect('back');
    }
    }catch(err){
        return res.status(401).send('Unauthorized');
    }
}
module.exports.profile = async(req, res)=>{
    user = await User.findById(req.params.id);
    console.log(pass.user.name)
    const user_mod = await User.findById(pass.user);
    return res.render("profile",{
        title: "Codial | profile",
        cust2: user,
        cust: user_mod
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
        console.log("qwertyu");
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
                console.log(findit);
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