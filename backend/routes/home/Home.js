const route = require('express').Router();
const { HomeData } = require('../../controller/home/HomeController');
const verifToken = require('../../middleware/VerifToken');

route.get('/calories',verifToken, HomeData);

module.exports=route;