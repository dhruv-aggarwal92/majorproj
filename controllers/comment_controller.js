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

