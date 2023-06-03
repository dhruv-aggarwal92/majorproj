const Post = require("../models/post");
const pass = require("../config/passport-local-st")

// module.exports.create = function(req,res){
//     Post.create({
//         content: req.body.content,
//         user: req.user_id 
//     },function(err,post){
//         if(err){
//             console.log("error in creating post");
//         }
//         return res.redirect("back");
//     });
// }
module.exports.create = async(req,res)=>{
    try{
    // if (user){
        Post.create({
        content: req.body.content,
        user: pass.user._id
    })
    return res.redirect('/');
    // }
    // else{
    //     console.log("first sing-in")
    //     return res.redirect("/users/log-in");
    // }
    }catch(err){
        console.log("err in posting comment");
    }
}