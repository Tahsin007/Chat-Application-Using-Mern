const express = require('express');
const {check} = require('express-validator');
const router = express.Router();

const {addUserValidators,addUserValidationHandler} = require('../middlewares/userMiddleware/userValidator');
const {getUsers,addUser,removeUser} = require('../controller/userController');
const avatarUploads = require('../middlewares/userMiddleware/avatarUploads');
const decortaeHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const {checkLogin,requireRole} = require('../middlewares/common/checkLogin');




router.get('/users',decortaeHtmlResponse("Users"),checkLogin,requireRole("Admin"),getUsers);
router.delete('/users/:id',removeUser);
router.post('/users',avatarUploads,addUserValidators,addUserValidationHandler,addUser);


module.exports = router;