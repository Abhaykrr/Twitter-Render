const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        res.redirect('/');
    }
    next();
}

module.exports ={isLoggedIn};