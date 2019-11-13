//fetching the existing or the same instance instance of express as it is requiring second time     
const express=require('express');

//create a route handlers.
const router = express.Router();

//exporting home_controllers
const homeController=require('../controller/home_controller');


//accessig the home controller request
router.get('/',homeController.home);

// if any /user request comes       
router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

router.use('/api',require('./api'));

//for any further routes access from here
//routes.use("/routerName",require('./routerfile'));


console.log('router loded');


//exporting this to be available to the index.js 
module.exports= router;