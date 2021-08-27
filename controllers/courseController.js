const get_createCourse_form = function (req, res, next) {
    res.render("create-course");
};

const get_courseDetails = function (req, res, next) {
    res.render("course-details");
};

const get_editCourse_form = function (req, res, next) {
    res.render("edit-course");
};

module.exports = {
    get_createCourse_form,
    get_courseDetails,
    get_editCourse_form
};