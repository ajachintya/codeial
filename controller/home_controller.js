//A group of actions is called as controller

//an exported function home
module.exports.home=function(req,res){
    return res.end('<h1>Express is up for codeial!</h1>');
}

module.exports.home2=function(req,res){
    return res.end('<h1>Express from home 2</h1>');
}

//module.exports.actionName=function_name(req,res){}