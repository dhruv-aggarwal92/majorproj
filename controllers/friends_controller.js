const User = require("../models/users");
const pass = require("../config/passport-local-st");
const Friendship = require('../models/friendship');

module.exports.isfriend = async(req,res)=>{
    try{
        let user_prof = await User.findById(req.query.id);
        let user_session = await User.findById(pass.user.id);

        if(req.query.type == 'false'){
            let create_friend = await Friendship.create({
                from_user: pass.user.id,
                to_user: req.query.id,
                is_friend: false
            })
        }else{
            user_prof.friendships.pull(user_session.id);
            user_session.friendships.pull(user_prof.id);
            let remove_friend_from = await Friendship.findOneAndDelete({from_user: pass.user.id});
            let remove_friend_to= await Friendship.findOneAndDelete({to_user: pass.user.id})
            user_prof.save();
            user_session.save();
        }
        return res.redirect('back')
    }catch(err){
        console.log('Error in friends cont',err)
        return res.redirect('back')
    }
}

module.exports.request = async(req,res)=>{
    try{
        let user_prof = await User.findById(req.query.id);
        let user_session = await User.findById(pass.user.id);
        let friend = await Friendship.findById(req.query.type)

        if(req.query.request=='accept'){
            friend.is_friend=true;
            friend.save();
            user_prof.friendships.push(user_session.id);
            user_session.friendships.push(user_prof.id);
            user_prof.save();
            user_session.save();
        }else if(req.query.request=='remove'){
            let remove_friend = await Friendship.findOneAndDelete({from_user: pass.user.id})
        }
        return res.redirect('back')
    }catch(err){
        console.log('Error in friends request',err)
        return res.redirect('back')
    }
}