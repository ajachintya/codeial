const express=require('express');
const passport=require('passport');

//create a route handlers.
const router=express.Router();

const postsControllers = require('../controller/posts_controller');

router.post('/create',passport.checkAuthentication,postsControllers.create);
router.get('/destroy/:id',passport.checkAuthentication,postsControllers.destroy);

module.exports = router;