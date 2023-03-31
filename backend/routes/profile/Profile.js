const routes = require('express').Router();
const { GetUserProfile } = require('../../controller/profile/ProfileController');
const verifToken = require('../../middleware/VerifToken');

routes.get(`/user`,verifToken, GetUserProfile);

module.exports = routes;