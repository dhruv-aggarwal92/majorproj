const pass = require("../config/passport-local-st");
const Post = require("../models/post");
const Comment = require("../models/comments");
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
        Post.create({
        content: req.body.content,
        user: pass.user._id
    })
    return res.redirect('/');
    }catch(err){
        console.log("err in posting comment");
    }
}

module.exports.destroy = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        // .id means converting the object id into string
        if(post.user = pass.user.id){               //pass is for user loged in at that moment
            console.log("lolol3");
            // post.remove();
            // let cont = await Post.findByIdAndDelete(post._id)
            // return res.redirect("back");
            // let cot = await Comment.find
            let cot = await Comment.deleteMany({post: req.params.id})
            return res.redirect("back");
        }
        else{
            console.log("diff user");
        }
    }catch(err){
        console.log("err in deleting post");
    }
}