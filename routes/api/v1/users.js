//fetching the existing or the same instance instance of express as it is requiring second time     
const express=require('express');

//create a route handlers.
const router = express.Router();
const usersApi=require('../../../controller/api/v1/users_api');

router.post('/create-session',usersApi.createSession);

module.exports=router;