//fetching the existing or the same instance instance of express as it is requiring secinid time     
const express=require('express');

//exporting hoem_controllers
const homeController=require('../controller/home_controller');
//create a route handlers.
const router = express.Router();

//accessig the home controller

router.get('/',homeController.home);

console.log('router loded');

//exporting this to be available to the index.js 
module.exports= router;