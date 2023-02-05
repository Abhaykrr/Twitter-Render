const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const {isLoggedIn} = require('../middleware');
const flash =  require('connect-flash');
const router = express.Router();

router.get('/home', isLoggedIn,(req,res)=>{
     res.render('home',{uname:req.user.firstName});
});

router.post('/register',async (req,res)=>{

    try {
        console.log(req.body);
            const user= {
                
                firstName: req.body.firstname,
                lastName:req.body.lastname,
                email:req.body.email,
                username:req.body.username, 

            }

                const newUser = await User.register(user,req.body.password);
                res.send(newUser);
    } catch (error) {
        req.flash('error' , error.message);
    }
    
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',                          //dought
    failureRedirect: '/fail' 
}), (req,res)=>{
  // res.render('home');                               // not working  // redirect should be used
});


router.get('/logout',(req,res)=>{
    req.logout(()=>{
        res.redirect('/');
    });
});

module.exports = router;