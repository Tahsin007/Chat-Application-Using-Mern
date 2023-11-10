const express = require('express');
const router = express.Router();
const {getInbox} = require('../controller/inboxController');

router.get('/inbox',getInbox);

module.exports = router;