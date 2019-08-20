//require express
const express=require('express');
//running express function
const app=express();
//port 
const port=8000;
//telling where to look for my static files
app.use(express.static('./assets'));
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

//extract styles and scripts from sub pages in the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use express routes or telling it to use the router
app.use('/',require('./routes'));

//setting up ejs(view engine)
app.set('view engine','ejs');
app.set('views','./views');

//create a listen on specified port or path
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});
