const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    let post = await Post.findById(req.body.post);
        try{
            if(post){
                let comment=await Comment.create({
                     content:req.body.content,
                     post:req.body.post,
                     user:req.user._id
                 });
                     post.comments.push(comment);
                     post.save();
                     req.flash('success','Comment created');
                     res.redirect('/');
             }
        }catch(err){
            req.flash('error',err);
            console.log("error" , err);
        }
}

// Comment.findById(req.params.id,function(err,comment){
//     console.log("hello1");
//     if(comment.user==req.user.id){
//         console.log("hello");
//          let postId=comment.post;
//          comment.remove();
//          Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
//              return res.redirect('back');
//          })        
//     }
//     else{
//         return res.redirect('back');
//     }
// })
module.exports.destory=async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id).populate('post');
        if(comment.user==req.user.id || comment.post.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            req.flash('success','Comment deleted!');
            return res.redirect('back');       
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
    }
    
}