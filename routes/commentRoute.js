const { json } = require("express");
const express = require("express");
const { isLoggedIn } = require("../middleware");
const router = express.Router();
const Chat = require('../models/chat');
const Comment = require('../models/comment');


router.post('/addcomment/:pid/:uname', async (req,res)=>{
    // console.log(req.body.content);
    // console.log(req.params.cid);
    // console.log(req.params.uname);

const comm = {
    content: req.body.content,
    // postedBy: req.params.uname,
    postedBy: req.user.username,

    postId : req.params.pid
}
// console.log(comm);
const newComment = await Comment.create(comm);
// res.send(newComment);
res.redirect('/home');

});

router.get('/comment/:id',  async (req,res)=>{

     const comm = await Comment.find({postId:req.params.id});
     res.json(comm);
    
});



module.exports = router;