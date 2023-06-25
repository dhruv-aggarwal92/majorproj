const User  = require('../../../models/users')
const jwt = require('jsonwebtoken')

module.exports.createsession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        module.exports.user = user;
        if(!user || user.password!=req.body.password){
            return res.json(442,{
                message:"Invalid username or password"
            })
        }
        return res.json(200,{
            message: 'Sign in successfully, here is your token, please keep it safe',
            data:{
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'})
            }
        })
    }catch(err){
        console.log(err)
        return res.json(500,{
            message:'Internal server error'
        })
    }
}
