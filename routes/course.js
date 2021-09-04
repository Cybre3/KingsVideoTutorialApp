// NPM Library imports
var express = require("express");
var router = express.Router();
// Controllers
const courseControl = require("../controllers/courseController");
// Middleware
const middlewareSearch = require("../middleware/search");
const middlewareAuth = require("../middleware/auth");

// Get routes
router.get("/create", middlewareAuth.auth, courseControl.get_createCourse_form);
router.get(
    "/details/:id",
    middlewareAuth.auth,
    middlewareSearch.findMyCourse,
    middlewareSearch.findMyUser,
    courseControl.get_courseDetails
);
router.get("/edit/:id", middlewareAuth.auth, middlewareSearch.findMyCourse, courseControl.get_editCourse_form);
router.get("/delete/:id", middlewareAuth.auth, middlewareSearch.findMyCourse, courseControl.get_deleteCourse_form);
router.get(
    "/enroll/:id",
    middlewareAuth.auth,
    middlewareSearch.findMyCourse,
    middlewareSearch.findMyUser,
    courseControl.get_enrollCourse
);

// Post Routes
router.post("/create", middlewareAuth.auth, courseControl.post_saveCourse_DB);
router.post(
    "/edit/:id",
    middlewareSearch.findMyCourse,
    courseControl.post_editCourse_DB
);
router.post(
    "/delete/:id",
    middlewareSearch.findMyCourse,
    courseControl.post_deleteCourse_DB
);

module.exports = router;
