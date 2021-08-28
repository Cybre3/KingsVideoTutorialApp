// NPM Library imports
var express = require('express');
var router = express.Router();
// Controllers
const courseControl = require('../controllers/courseController');


// Get routes
router.get('/create', courseControl.get_createCourse_form);
router.get('/details', courseControl.get_courseDetails);
router.get('/edit', courseControl.get_editCourse_form);

// Post Routes
router.post('/create', courseControl.post_saveCourse_DB);

module.exports = router;
