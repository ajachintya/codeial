//fetching the existing or the same instance instance of express as it is requiring second time     
const express=require('express');

//create a route handlers.
const router = express.Router();

const postsApi=require('../../../controller/api/v1/posts_api');

router.get('/',postsApi.index);


module.exports=router;