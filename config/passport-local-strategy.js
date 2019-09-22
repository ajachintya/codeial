const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//telling passport to use local steategy 

//authentication using passport js
passport.use(new LocalStrategy({
      usernameField:'email'
    },
    //inbuilt function
    function(email,password,done){
     //find a user and establist an identity
     User.findOne({email:email},function(err,user){
         if(err){
             console.log('error in finding user');
             return done(err);
         }
         if(!user || user.password!=password){
             console.log('invalid username or password');
             return done(null,false);
         }
           return done(null,user);
     });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})


//deserialinzing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user');
            return done(err);
        }
        return done(null,user);
    })
});

//check if user is authenticated 
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in then pass on the request to the next function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }
    //if user is not signed in 
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
           //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
           res.locals.user = req.user;

    }
    next();
}

module.exports=passport;