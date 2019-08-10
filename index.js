//require express
const express=require('express');
//running express function
const app=express();
//port 
const port=8000;

//create a listen on specified port or path
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});
