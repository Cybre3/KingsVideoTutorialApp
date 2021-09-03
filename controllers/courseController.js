// Models
const Course = require("../models/Course");
const User = require("../models/User");

// Get routes
const get_createCourse_form = function (req, res, next) {
    const validUser = req.user;
    console.log(validUser);
    res.render("create-course", { user: validUser });
};
const get_courseDetails = function (req, res, next) {
    const validUser = req.foundUser;
    const courseDetails = req.foundCourse;
    const data = {
        validUser,
        courseDetails,
    };

    // validUser.populate('enrolledCourses');
    // console.log(validUser)
    res.render("course-details", { data: data });
};
const get_editCourse_form = function (req, res, next) {
    const validUser = req.user;
    res.render("edit-course", { user: validUser });
};
const get_deleteCourse_form = function (req, res, next) {
    const validUser = req.user;
    res.render("delete-course", { user: validUser });
};
const get_enrollCourse = async function (req, res, next) {
    const validUser = await req.user;
    const course = await req.foundCourse;
    const data = {
        validUser,
        course,
    };
    console.log('this is:', course._id, validUser)
    await User.findByIdAndUpdate(
        validUser._id,
        {
            $addToSet: { enrolledCourses: course._id },
        },
        function (err, data) {
            console.log("Course added to user!");
        }
    ).lean();

    res.redirect(`/course/details/${req.params.id}`);
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

    await Course.findByIdAndUpdate(
        dbId.id,
        updatedCourse,
        function (err, data) {
            if (err) return console.log(err);
            console.log("Course update successful", data);
        }
    );

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
    get_enrollCourse,
    post_saveCourse_DB,
    post_editCourse_DB,
    post_deleteCourse_DB,
};
