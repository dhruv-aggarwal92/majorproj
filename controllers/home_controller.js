const pass = require("../config/passport-local-st");
const post = require("../models/post");
const User = require("../models/users");
const gpass = require("../config/passport-google-oauth2-strategy");


// module.exports.home = async(req,res)=>{
//     try{
//     user = await User.find({});
//     console.log(req.cookies);
//     try{
//         const posts= await post.find({})
//         res.cookie('user_id',24);
//         return res.render('home',{
//             title: 'MYproj',
//             cust: pass.user,
//             user_post: posts
//         });
//     }catch(err){
//         console.log("error in fetching post");
//     }
//     post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path: 'user'
//         }
//     }) 
//     .then((posts)=>{
//             return res.render('home',{
//                 title: 'MYproj',
//                 cust: pass.user,
//                 user_post: posts,
//                 all_user: user
//             })
//         }).catch((err)=>{
//         console.log("error in fetching post");
//     });
//     }catch(err){
//         consol.log("err in finding user")
//     }
// }

module.exports.home = async(req,res)=>{
    try{
        let posts = await post.find({})
        .sort('-createdAt')                            //sort my post in cronlogical order
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path: 'user'
            }
        });
        let user= await User.find({})
        let user_mod={};
        if(gpass.user){ 
            user_mod = await User.findById(gpass.user);
        }
        if(pass.user){
            user_mod = await User.findById(pass.user);
        }
        return res.render('home',{
            title: 'MYproj',
            cust: user_mod,
            user_post: posts,
            all_user: user
        })
    }catch(err){
        console.log("err in finding user",err)
    }
}

