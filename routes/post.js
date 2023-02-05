const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User =require('../models/user');
const {isLoggedIn} = require('../middleware');

router.get('/post',isLoggedIn,async (req,res)=>{
    const posts=await Post.find({}).populate('postedBy');
    res.json(posts);
});


router.patch('/posts/:id/like',isLoggedIn,async(req,res)=>{

    // res.send("you hit the route");
    const postId = req.params.id;
    const userId = req.user._id;
    
    const isLiked = req.user.likes && req.user.likes.includes(postId);
    
    const option = isLiked ? '$pull':'$addToSet';

    req.user=await User.findByIdAndUpdate(userId,{[option]:{likes:postId}},{new:true});

    const post = await Post.findByIdAndUpdate(postId,{[option]:{likes:userId}},{new:true});


    res.json(post);
})

router.post('/post',isLoggedIn, async (req,res)=>{
    const post = {
        content: req.body.content,
        postedBy: req.user,
    }

    const newpost =  await Post.create(post);
     console.log(newpost);
    // res.json(newpost);

})

module.exports = router;