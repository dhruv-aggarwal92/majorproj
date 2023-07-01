const User = require("../models/users");
const pass = require("../config/passport-local-st");
const ResetPassword = require('../models/new_password') 
const crypto = require('crypto');
const newPassMailer = require('../mailers/forgot_password')
const fs = require('fs');
const path = require('path')
const gpass = require("../config/passport-google-oauth2-strategy");

const Friendship = require('../models/friendship');
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
    let friend;
    let user_mod={};
    if(pass.user){
        user_mod = await User.findById(pass.user);
    }
    if(gpass.user){
        user_mod = await User.findById(gpass.user);
    }   
    let Friends_r = await Friendship.findOne({
        from_user: req.params.id,
        to_user: user_mod.id
    })
    // console.log(user_mod.id)
    // console.log(req.params.id)
    // console.log(Friends_r)
    if(!Friends_r){
        Friends_r = await Friendship.findOne({
            from_user: user_mod.id,
            to_user: req.params.id
        })
    }
    if(Friends_r){

        if(Friends_r.is_friend==true){
            friend = true;
        }else{
            friend = Friends_r;
        }
    }else{
        friend = false;
    }
    // console.log('as=',friend);
    return res.render("profile",{
        title: "Codial | profile",
        cust2: user,
        cust: user_mod,
        friend: friend
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
module.exports.forgot_password = function(req, res){
    return res.render("forgot_password",{
        title: "Codial | Log In"
    });
}

module.exports.reset_link = async(req, res)=>{
    try{
        let user = await User.findOne({email: req.body.email})
        if(user){
            let new_pass_link = await ResetPassword.create({
                user: user,
                accessToken: crypto.randomBytes(20).toString('hex'),
                isValid: true
            })
            new_pass_link = await new_pass_link.populate('user', 'name email password');
            newPassMailer.newPass(new_pass_link)

            // console.log(new_pass_link)
            return res.redirect('back')
        }else{
            req.flash('error','Invalid Username');
            console.log('Invalid Username')
            return res.redirect("back");
        }
    }catch(err){
        console.log('Error in sending reset password mail',err)
    }
}
module.exports.reset_password = async function(req,res){
    let new_pass = await ResetPassword.findOne({accessToken: req.params.accessToken})
    return res.render('reset_password',{
        title:'Reset Password',
        accessToken: req.params.accessToken,
        isValid: new_pass.isValid
    })
}
module.exports.update_pass = async(req,res)=>{
    try{
        if(req.body.password==req.body.confirm_password){
            let new_pass = await ResetPassword.findOne({accessToken: req.params.accessToken})
            if(new_pass){
                let user = await User.findById(new_pass.user)
                user.password=req.body.password;
                new_pass.isValid = false;
                user.save();
                new_pass.save();
                return res.redirect('/users/log-in');
            }
            else{
                console.log('Access token is expired or deleted')
            }
           
        }else{
            req.flash('error','password and confirm password does not match');
            console.log('password and confirm password does not match')
            return res.redirect('back')
        }
    }catch(err){
        console.log('error in changing pass',err);
    }
    
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
    return res.redirect("/");
}

module.exports.destroysession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');    
        res.redirect('/');
      });
}