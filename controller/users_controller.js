//users profile
module.exports.profile=function(req,res){
    return res.end('<h1>Users Profile</h>');
}
//users controller
module.exports.post=function(req,res){
    return res.end("<h1>Users post</h1>");
}