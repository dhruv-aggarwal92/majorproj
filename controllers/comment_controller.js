const Comment = require("../models/comments");
const Post = require("../models/post");
const pass = require("../config/passport-local-st");
const job = require('../config/kue')
const commentEmailWorker = require('../workers/comment_email_workers')
const commentsMailer = require('../mailers/comments_mailer');
const queue = require("../config/kue");
const Like = require('../models/likes');

module.exports.create = async(req, res)=>{
    try{
        const post = await Post.findById(req.body.post)
        try{  
            if(post){
                let comment = await Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: pass.user._id
                })
                post.comments.push(comment)
                post.save();

                // Similar for comments to fetch the user's id!
                comment = await comment.populate('user', 'name email');
                // commentsMailer.newComment(comment)
                let job = queue.create('emails',comment).save(function(err){
                    if(err){
                        console.log('error in creating a queue')
                        return;
                    }
                    console.log('job enqueued',job.id);
                })

                if(req.xhr){                
                    console.log('xcvb')    
                    return res.status(200).json({
                        data:{
                            comment:comment
                        },
                        message: "comment cereated"
                    });
                }
                req.flash('success', 'Comments is posted')
                res.redirect('/');
                }
            else{
                req.flash('error', 'This is not a valid post')
                console.log("err in finding post")
            }   
        }catch(err){    
            console.log("comment does not added to post schemas")
        }
    }catch(err){
        req.flash('error', err)
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

            //delete a like
            await Like.deleteMany({likeable:comment._id, onModel: 'Comment'});
            req.flash('success', 'Comment is deleted')
            return res.redirect('back');
        }
        else{
            req.flash('error', 'You can not delete this comment')
            console.log("that not your comment you naughty");
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err)
        console.log("error in removing comment")
    }
}