const pass = require("../config/passport-local-st");
const Post = require("../models/post");
const Comment = require("../models/comments");
const path=require('path')
const fs =require('fs')

const gpass = require("../config/passport-google-oauth2-strategy");

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
// module.exports.create = async(req,res)=>{
//     try{
//         let post = await Post.create({
//         content: req.body.content,
//         user: pass.user._id
//     });
//     if (req.xhr){                     //checks if the req is AJAX req and ajax req is xml
//         console.log(post.user)
//         return res.status(200).json({            //we return json with status
//             data:{ 
//                 post:post,
//                 name:post.user.name
//             },
//             message: "Post created"
//         })
//     }

//     req.flash('success', 'Post is created')

//     return res.redirect('/');
//     }catch(err){
//         req.flash('error', err)

//         console.log("err in posting comment");
//     }
// }
module.exports.create = async(req,res)=>{
    try{
            Post.uploadedPost(req,res, async(err)=>{
            if(err){console.log('*****Multer Error*****:',err)}
        
        let post = await Post.create({
            content: req.body.content,
            user: pass.user._id
        });
        if(req.file){
            //this is saving the path of the uploaded file into the avatar field in user 
            post.post_img = Post.postimgpath+'/'+req.file.filename;
        }
        post.save();
        req.flash('success', 'Post is created')

        return res.redirect('/');
        })
    }catch(err){
        req.flash('error', err)

        console.log("err in posting post");
    }
}

module.exports.destroy = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        // .id means converting the object id into string
        if(post.user == pass.user.id){               //pass is for user loged in at that moment
            // post.remove();
            let cont = await Post.findByIdAndDelete(post._id)
            let cot = await Comment.deleteMany({post: req.params.id})
            
            if(post.post_img){
                let path_check = path.join(__dirname,'..',post.post_img)
                if (fs.existsSync(path_check)) {
                    fs.unlinkSync(path.join(__dirname,'..',post.post_img))
                }
            }

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message: 'Post deleted'
                })
            }
            
            req.flash('success', 'Post and associated comments deleted')
            return res.redirect("back");
        }
        else{
            req.flash('error','You cannot delete this post!')
            console.log("diff user");
        }
    }catch(err){
        req.flash('error', err);

        console.log("err in deleting post");
    }
}