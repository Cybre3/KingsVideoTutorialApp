// Models
const Course = require("../models/Course");

// Get routes
const get_createCourse_form = function (req, res, next) {
    res.render("create-course");
};
const get_courseDetails = function (req, res, next) {
    res.render("course-details");
};
const get_editCourse_form = function (req, res, next) {
    res.render("edit-course");
};
const get_deleteCourse_form = function (req, res, next) {
    res.render("delete-course");
};

// Post Routes
const post_saveCourse_DB = function (req, res, next) {
    let { title, description, imageUrl, isPublic } = req.body;
    console.log("This is req.body:", req.body);

    if (isPublic === "on") {
        isPublic = true;
    }
    const aNewCourse = new Course({
        title,
        description,
        imageUrl,
        isPublic,
    });
    console.log("This is aNewCourse obj:", aNewCourse);

    aNewCourse
        .save()
        .then(() => {
            res.status(201).json({
                message: "New course created successfully!",
                course: aNewCourse,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Course did not save!",
                error: err,
            });
        });

    // res.send(aNewCourse);
};
const post_editCourse_DB = async function (req, res, next) {
    const dbId = req.foundData;

    let { title, description, imageUrl, isPublic } = req.body;

    if (isPublic === "on") {
        isPublic = true;
    }

    const updatedCourse = { title, description, imageUrl, isPublic };

    await Course.findByIdAndUpdate(dbId.id, updatedCourse, function (err, data) {
        if (err) return console.log(err);
        console.log("Course update successful", data);
    });

    res.redirect("/");
};
const post_deleteCourse_DB = async function (req, res, next) {
    const dbId = req.foundData;

    await Course.findByIdAndDelete(dbId.id, function (err) {
        if (err) return console.log(err);
        console.log("Course deleted successful");
    });

    res.redirect("/");
};

module.exports = {
    get_createCourse_form,
    get_courseDetails,
    get_editCourse_form,
    get_deleteCourse_form,
    post_saveCourse_DB,
    post_editCourse_DB,
    post_deleteCourse_DB
};
