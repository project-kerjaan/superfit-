const router = require('express').Router();
const verifTokenMidleware = require("../../middleware/VerifToken");
const { updateUserAvatar } = require("../../controller/profile/ProfileController");
const { LoginHandler,RegisterHandler,UserSetting } = require('../../controller/auth/AuthenticationController');
const multer = require('multer');
const upload = multer({ dest:"uploads/" });

router.post('/login',LoginHandler);
router.post('/register',RegisterHandler);
router.post('/userSetting' , UserSetting);
router.post("/update/avatar",verifTokenMidleware , updateUserAvatar);

module.exports = router;