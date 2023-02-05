const mongoose =  require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        trim:true,
        required:true
    },
    postedBy:{
        type:String,
        trim:true,
        required:true
    }, 
    postId:{
        type:String,
        trim:true,
        required:true
    }
},
{timestamps:true});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;