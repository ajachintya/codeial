const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');

const commentEmailWorker=require('../workers/comments_email_worker');

const queue=require('../config/kue');

module.exports.create = async function (req, res) {
    let post = await Post.findById(req.body.post);
    try {
        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            post.comments.push(comment);
            post.save();

            comment=await comment.populate('user','name email').execPopulate();
            //commentsMailer.newComment(comment);

            let job=queue.create('emails',comment).save(function(err){
                if(err){
                    console.log('error in creating a queue',err);
                    return;
                }

                console.log('job enqueued',job.id);

            });

            if(req.xhr){
                return res.status(200).jason({
                    data:{
                        comment:comment
                    },
                    message:"Post Created"
                })
            }

            req.flash('success', 'Comment created');
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        console.log("error", err);
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
module.exports.destroy = async function (req, res) {
    try {
        let comment = await Comment.findById(req.params.id).populate('post');
        if (comment.user == req.user.id || comment.post.user == req.user.id) {
            let postId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('Error', err);
    }

}