const moongoose = require("mongoose")

const commentSchema = new moongoose.Schema({
    content:{
        type:String,
        required: true
    },
    //comment belongs to the user
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }

},{
    timestamps: true
});

const Comment = moongoose.model('Comment', commentSchema);
module.exports = Comment;