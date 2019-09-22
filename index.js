//require express
const express=require('express');
const cookieParser=require('cookie-parser');
//running express function
const app=express();
//port 
const port=8000;


const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

const sassMiddleware=require('node-sass-middleware');


app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));
app.use(express.urlencoded());

app.use(cookieParser());

//telling where to look for my static files
app.use(express.static('./assets'));
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

//extract styles and scripts from sub pages in the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setting up ejs(view engine)
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    //todo change the secret before deployment
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
          maxAge:(1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(err){
        console.log(err || 'connect mongo db setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use express routes or telling it to use the router
app.use('/',require('./routes'));

//create a listen on specified port or path
app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});
