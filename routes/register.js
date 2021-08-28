// NPM Library imports
var express = require('express');
var router = express.Router();
// Controllers
const registerControl = require('../controllers/registerController');

/* GET home page. */
router.get('/', registerControl.get_register_form);

// Post routes
router.post('/', registerControl.post_createUser)

module.exports = router;
