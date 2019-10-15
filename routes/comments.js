const express=require('express');
const passport=require('passport');

//create a route handlers.
const router=express.Router();

const commentssControllers = require('../controller/comments_controller');

router.post('/create',passport.checkAuthentication,commentssControllers.create);
router.get('/destory/:id',passport.checkAuthentication,commentssControllers.destory);
module.exports = router;