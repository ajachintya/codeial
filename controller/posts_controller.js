const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async function(req,res){
    try{
        await Post.create({
            content: req.body.content,
            user : req.user._id
        });
        req.flash('success','Post created');
        return res.redirect('back');
    }catch(err){
        req.flash('error','Post not created');
        return;
    }
    
}

module.exports.destory= async function(req,res){
    try{
    let post =await Post.findById(req.params.id);
        // .id means converting the object in into string
        if(post.user == req.user.id){
            post.remove();
           await Comment.deleteMany({post:req.params.id});
           req.flash('success','Post deleted');
           return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error' ,err);
        return;
    }
        
}