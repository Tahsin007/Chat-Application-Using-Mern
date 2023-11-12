const express = require('express');
const router = express.Router();
const {getInbox} = require('../controller/inboxController');
const decortaeHtmlResponse = require('../middlewares/common/decorateHtmlResponse')
const {checkLogin} = require('../middlewares/common/checkLogin');

router.get('/inbox',decortaeHtmlResponse("Inbox"),checkLogin,getInbox);

module.exports = router;