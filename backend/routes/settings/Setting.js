const router = require('express').Router();
const {
    DeleteAccount,
    UpdateProfile,
    ChangePassword
} = require("../../controller/setting/AccountController");
const verifToken = require('../../middleware/VerifToken');

router.post('/delete-account'  ,verifToken, DeleteAccount);
router.put("/update-profile",verifToken , UpdateProfile);
router.post('/change-password',verifToken, ChangePassword);

module.exports = router;