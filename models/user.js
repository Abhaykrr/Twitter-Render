const mongoose = require('mongoose');
const passportLocalMongoose  = require('passport-local-mongoose');

// schema
// A Mongoose schema defines the structure of the document ,default values
const userScheama = new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        unique:true, // validating your schema
        required:true
    },
    profilePic:{
        type:String,
        default:'/images/profilePic.jpeg'
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,    //changes
        ref:'Post',
    }]

});
userScheama.plugin(passportLocalMongoose); // takes care of undefined schema objects
const User = mongoose.model('User',userScheama);
module.exports = User;

