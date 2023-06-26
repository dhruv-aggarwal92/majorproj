const User = require("../models/users");
const pass = require("../config/passport-local-st");

const fs = require('fs');
const path = require('path')
const gpass = require("../config/passport-google-oauth2-strategy");
module.exports.update = async(req,res)=>{
    try{   
    if(pass.user.id == req.params.id){
            // const user_update = await User.findByIdAndUpdate(req.params.id,{name:req.body.name, email:req.body.email});   //now body.parser not able to access my form directly because of enctype="multipart/form-data"
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req,res, function(err){
                if(err){console.log('*****Multer Error*****:',err)}
                user.name = req.body.name;
                user.email = req.body.email;    

                if(user.avatar){
                    let path_check = path.join(__dirname,'..',user.avatar)
                    if (fs.existsSync(path_check)) {
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                    }
                }
                if(req.file){
                    //this is saving the path of the uploaded file into the avatar field in user 
                    user.avatar = User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
    }
    else{
        req.flash('error','Unauthorized');
        return res.redirect('back');
    }
    }catch(err){
        return res.status(401).send('Unauthorized');
    }
}
module.exports.profile = async(req, res)=>{
    let user = await User.findById(req.params.id);
    let user_mod={};
    if(pass.user){
        user_mod = await User.findById(pass.user);
    }
    if(gpass.user){
        user_mod = await User.findById(gpass.user);

    }
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
    req.flash('success', 'Logged in Successfully');    
    return res.redirect("back");
}

module.exports.destroysession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');    
        res.redirect('back');
      });
}