// NPM Library imports
var express = require('express');
var router = express.Router();
// Controllers
const logoutControl = require('../controllers/logoutController');


router.get('/', logoutControl.logout);

module.exports = router;