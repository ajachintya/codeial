//fetching the existing or the same instance instance of express as it is requiring secinid time     
const express=require('express');

//create a route handlers.
const router=express.Router();

//fetching users_controller

const usersContrller=require('../controller/users_controller');
//for prifile
router.get('/profile',usersContrller.profile);
//for post
router.get('/post',usersContrller.post);

//exporting this to be available to the index.js 
module.exports=router;