//fetching the existing or the same instance instance of express as it is requiring second time     
const express=require('express');

const passport=require('passport');

//create a route handlers.
const router = express.Router();



const postsApi=require('../../../controller/api/v1/posts_api');

router.get('/',postsApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy);

module.exports=router;