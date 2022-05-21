// NPM Library imports
var express = require('express');
var router = express.Router();
// Controllers
const homeControl = require('../controllers/homeController');
// middleware
const middlewareSearch = require('../middleware/search');
const middlewareAuth = require('../middleware/auth');

/* GET home page. */
router.get('/', middlewareSearch.findAllCourses, middlewareAuth.auth, middlewareSearch.findMyUser, homeControl.get_homeLayout);

module.exports = router;
