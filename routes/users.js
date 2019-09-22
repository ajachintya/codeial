//fetching the existing or the same instance instance of express as it is requiring secinid time     
const express=require('express');

//create a route handlers.
const router=express.Router();

const passport=require('passport');

//fetching users_controller
const usersController=require('../controller/users_controller');
//for prifile
router.get('/profile',passport.checkAuthentication,usersController.profile);

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);


router.use('/sign-out',usersController.destroySession);
//exporting this to be available to the index.js 
module.exports=router;