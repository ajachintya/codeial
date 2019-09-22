const express=require('express');

//create a route handlers.
const router=express.Router();

const postsControllers = require('../controller/posts_controller');

router.post('/create',postsControllers.create);

module.exports = router;