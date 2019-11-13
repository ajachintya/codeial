//fetching the existing or the same instance instance of express as it is requiring second time     
const express=require('express');

//create a route handlers.
const router = express.Router();

router.use('/v1',require('./v1'));

module.exports=router;