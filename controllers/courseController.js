const Course = require("../models/Course");

const get_createCourse_form = function (req, res, next) {
    res.render("create-course");
};

const get_courseDetails = function (req, res, next) {
    res.render("course-details");
};

const get_editCourse_form = function (req, res, next) {
    res.render("edit-course");
};

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

module.exports = {
    get_createCourse_form,
    get_courseDetails,
    get_editCourse_form,
    post_saveCourse_DB,
};
