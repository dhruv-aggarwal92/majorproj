const Comment = require("../models/comments");
const Post = require("../models/post");
const pass = require("../config/passport-local-st");

module.exports.create = async(req,res)=>{
    try{
        const post = await Post.findById(req.body.post)
        try{  
            if(post){
                const comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post, 
                    user: pass.user._id     
                })
                post.comments.push(comment)
                post.save();
                return res.redirect('/');
                }
            else{
                console.log("err in finding post")
            }   
        }catch(err){
            console.log("lol comment des not added to post schemas")
        }
    }catch(err){
        console.log("err in posting comment")
    }
}
module.exports.destroy = async(req,res)=>{
    try{
        const comment = await Comment.findById(req.params.id)
        if(comment.user==pass.user.id){
            let postid = comment.post;
            let c = await Comment.findByIdAndDelete(comment._id)
            let post = await Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}})
            return res.redirect('back');
        }
        else{
            console.log("that not your comment you naughty");
            return res.redirect('back');
        }
    }catch(err){
        console.log("error in removing comment")
    }
}