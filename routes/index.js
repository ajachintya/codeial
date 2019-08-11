//fetching the existing or the same instance instance of express as it is requiring secinid time     
const express=require('express');

//exporting home_controllers
const homeController=require('../controller/home_controller');
//create a route handlers.
const router = express.Router();

//accessig the home controller

router.get('/',homeController.home);
//accessing home2 cotroller
router.get('/home2',homeController.home2);
// if any /user request comes       
router.use('/users',require('./users'));

//for any further routes access from here
//routes.use("/routerName",require('./routerfile'));


console.log('router loded');


//exporting this to be available to the index.js 
module.exports= router;