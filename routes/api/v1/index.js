//fetching the existing or the same instance instance of express as it is requiring second time     
const express=require('express');

//create a route handlers.
const router = express.Router();

router.use('/posts',require('./posts'));


module.exports=router;