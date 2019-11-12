const User=require('../models/user');
const fs=require('fs');
const path=require('path');
//users profile
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:"profile",
            profile_user:user
        });
    })
    
};

module.exports.update= async function(req,res){
    //only allow update if the user is the current user
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
    //         return res.redirect('back');
    //     });
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id==req.params.id){
        try{
            let user= await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('Multer error',err);
                }
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                    if(user.avatar){
                        //if there are no previously updated avatar it will not show error upon adding new avatar
                        if (fs.existsSync(path.join(__dirname,'..',user.avatar))) {
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));   
                        }
                       
                    }
                    //this is saving the path of uploaded file into the avatar field in the user 
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }catch(err){
            console.log('error' ,err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorised!');
        return res.status(401).send('Unauthorized');
    }

}

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
    req.flash('success','Logged In !');
     return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Logged out !');
    return res.redirect('/');
}

