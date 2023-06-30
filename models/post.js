const mongoose = require("mongoose");

const multer = require('multer')
const path = require('path')
const POST_IMG = path.join('/uploads/users/posts')

const postSchema = new mongoose.Schema({
    content:{
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //include the array of ids of all comments in this post schema itself
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    post_img:{
        type: String
    },likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]

},{
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',POST_IMG));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });

postSchema.statics.uploadedPost = multer({storage: storage}).single('post_img');
postSchema.statics.postimgpath = POST_IMG;

const Post = mongoose.model('Post',postSchema);
module.exports = Post;
