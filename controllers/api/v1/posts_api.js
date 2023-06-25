const Post = require('../../../models/post')
const Comment = require('../../../models/comments')
const pass = require("./users_api");

module.exports.index = async(req,res)=>{
    
    let posts = await Post.find({})
    .sort('-createdAt')                            //sort my post in cronlogical order
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path: 'user'
        }
    })
    return res.json(200, {
        message: "List of posts",
        posts:posts 
    })
}

module.exports.destroy = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        console.log('ds=',pass.user._id)
        console.log('sd=',post.user)
        console.log(typeof(pass.user.email))
        console.log(typeof(post.user.email))

        // .id means converting the object id into string               
        if(post.user != pass.user._id){
            // post.remove();
            console.log('sdfghjk')
            // let cont = await Post.findByIdAndDelete(post._id)
            // let cot = await Comment.deleteMany({post: req.params.id})
            
           

            return res.json(200,{
                message:'Post deleted'
            });
        }
        else{
            return res.json(401,{
                message:"You can not delete this post"
            });
        }
    }catch(err){
        console.log(err)

        return res.json(500,{
            message:'Internal server error or post does not exist'
        })

    }
}