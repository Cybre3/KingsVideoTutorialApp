// NPM Library imports
var express = require('express');
var router = express.Router();
// Controllers
const courseControl = require('../controllers/courseController');
// Middleware
const middleware = require("../middleware/search");

// Get routes
router.get('/create', courseControl.get_createCourse_form);
router.get('/details', courseControl.get_courseDetails);
router.get('/edit', courseControl.get_editCourse_form);
router.get('/delete', courseControl.get_deleteCourse_form);

// Post Routes
router.post('/create', courseControl.post_saveCourse_DB);
router.post('/edit', middleware.findMe, courseControl.post_editCourse_DB);
router.post('/delete', middleware.findMe, courseControl.post_deleteCourse_DB);

module.exports = router;
