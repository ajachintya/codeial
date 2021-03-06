//fetching the existing or the same instance instance of express as it is requiring secinid time     
const express=require('express');

//create a route handlers.
const router=express.Router();

const passport=require('passport');

//fetching users_controller
const usersController=require('../controller/users_controller');
//for prifile
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
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

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);
module.exports=router;