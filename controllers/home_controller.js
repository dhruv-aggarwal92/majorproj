const pass = require("../config/passport-local-st")
const post = require("../models/post");

module.exports.home = async(req,res)=>{
    // console.log(req.cookies);
    // try{
    //     const posts= await post.find({})
    //     res.cookie('user_id',24);
    //     return res.render('home',{
    //         title: 'MYproj',
    //         cust: pass.user,
    //         user_post: posts
    //     });
    // }catch(err){
    //     console.log("error in fetching post");
    // }
    post.find({}).populate('user').then((posts)=>{
            return res.render('home',{
                title: 'MYproj',
                cust: pass.user,
                user_post: posts
            })
        }).catch((err)=>{
        console.log("error in fetching post");
    });
}

