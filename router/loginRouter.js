const express = require('express');
const router = express.Router();
const {getLogin,login,logout} = require('../controller/loginController');
const {doLoginValidators, doLoginValidationHandler} = require('../middlewares/login/loginValidators');
const decortaeHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const {checkLogin,redirectLoggedIn} = require('../middlewares/common/checkLogin');


router.get('/',decortaeHtmlResponse("Login"),redirectLoggedIn,getLogin);

// router.post('/',decortaeHtmlResponse,doLoginValidators,doLoginValidationHandler,login);
router.post('/',doLoginValidators,doLoginValidationHandler,decortaeHtmlResponse("Login"),login);

router.delete('/',logout);


module.exports = router;