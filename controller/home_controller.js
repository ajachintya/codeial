//A group of actions is called as controller

//an exported function home
module.exports.home=function(req,res){
    //'home' is for home.ejs 
    //rendering home.ejs
    return res.render('home',{
        title:"home"
    });
}

//module.exports.actionName=function_name(req,res){}