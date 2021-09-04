// NPM Library imports
var express = require('express');
var router = express.Router();
// Controllers
const userControll = require('../controllers/userController');
// middleware
const middlewareSearch = require('../middleware/search');
const middlewareAuth = require('../middleware/auth');

router.get('/:id', middlewareAuth.auth, middlewareSearch.findMyUser, userControll.get_enrolledCourses);

module.exports = router;