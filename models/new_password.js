const mongoose = require("mongoose");

const resetPassword = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    accessToken:{
        type: String,
    },
    isValid:{
        type:Boolean
    }

},{
    timestamps: true
});

const resetPass = mongoose.model('resetPass',resetPassword);
module.exports = resetPass;