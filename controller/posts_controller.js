const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create= async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user : req.user._id
        });
        
        if(req.xhr){
           // Show the user's name with the post added dynamically 
            post = await post.populate('user', 'name').execPopulate();
            return res.status(200).json({
                data:{
                    post: post,
                },
                message:"Post created"
            });
            
        }
        return res.redirect('back');
    }catch(err){
        req.flash('error','Post not created');
        return;
    }
    
}

module.exports.destroy = async function(req,res){
    try{
    let post =await Post.findById(req.params.id);
        // .id means converting the object in into string
        if(post.user == req.user.id){
            post.remove();
           await Comment.deleteMany({post:req.params.id});
           
           if(req.xhr){
               return res.status(200).json({
                   data:{
                       post_id:req.params.id,
                   },
                   message:'post deleted'
               })
           }
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