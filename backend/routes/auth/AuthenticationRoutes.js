const router = require('express').Router();

const { LoginHandler,RegisterHandler,UserSetting } = require('../../controller/auth/AuthenticationController');

router.post('/login',LoginHandler);
router.post('/register',RegisterHandler);
router.post('/userSetting' , UserSetting);

module.exports = router;