const express=require('express');
const passport=require('passport');

//create a route handlers.
const router=express.Router();

const commentssControllers = require('../controller/comments_controller');

router.post('/create',passport.checkAuthentication,commentssControllers.create);

module.exports = router;