const User=require('../models/user');

//users profile
module.exports.profile=function(req,res){
    return res.render('profile',{
        title:"profile"
    });
};


module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
};

//getting the sign up details

module.exports.create=function(req,res){
   if(req.body.password!=req.body.confirm_password){
       return res.redirect('back');
   }
   User.findOne({email:req.body.email},function(err,user){
       if(err){console.log('error in finding user in signing up'); return}
       
       if(!user){
           User.create(req.body,function(err,user){
               if(err){console.log('error in creating user while signing up'); return}

               return res.redirect('/users/sign-in');
           })
       }
       else{
        return res.redirect('back');
       }
   });
};

//sign in and create a session for use
module.exports.createSession=function(req,res){
     return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}

