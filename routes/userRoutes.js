const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const User =require('../models/user');
const {isLoggedIn} = require('../middleware');

router.get('/profile', async (req,res)=>{

    const post = await Post.find({postedBy:req.user});
    let payload = {
        post:post,
        user:req.user,
        displayName: req.user.firstName + " " + req.user.lastName,
    }
    // console.log(payload.post[0].content);
    res.render('user',{payload});

});



router.get("/profile/:username", isLoggedIn, async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const post = await Post.find({postedBy:user._id}).populate("postedBy");
  
    const payload = {
        post:post,
        user: user,
        displayName: user.firstName + " " + user.lastName,
      };

      console.log(payload);
  
     res.render("user", { payload });
  });


module.exports = router;