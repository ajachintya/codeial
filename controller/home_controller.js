//A group of actions is called as controller
const Post=require('../models/post');
//an exported function home
module.exports.home=function(req,res){
    //'home' is for home.ejs 
    //rendering home.ejs
    // console.log(req.cookies);
    // res.cookie('user_id',111);
    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codeial | home",
    //         posts:posts
             
    // })
    
    // });

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
           path:'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title:"Codeial | home",
            posts:posts
             
    });
    });
}

//module.exports.actionName=function_name(req,res){}