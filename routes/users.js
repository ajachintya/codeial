//fetching the existing or the same instance instance of express as it is requiring secinid time     
const express=require('express');

//create a route handlers.
const router=express.Router();

//fetching users_controller
const usersController=require('../controller/users_controller');
//for prifile
router.get('/profile',usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);
//exporting this to be available to the index.js 
module.exports=router;