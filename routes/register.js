// NPM Library imports
var express = require('express');
var router = express.Router();
// Controllers
const registerControl = require('../controllers/registerController');

/* GET home page. */
router.get('/', registerControl.get_registerForm);

module.exports = router;
