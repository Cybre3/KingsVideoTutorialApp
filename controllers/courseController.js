// Models
const Course = require("../models/Course");
const User = require("../models/User");

// Get routes
const get_createCourse_form = function (req, res, next) {
    const validUser = req.user;
    console.log(validUser);
    res.render("create-course", { user: validUser });
};
const get_courseDetails = async function (req, res, next) {
    const validUser = req.foundUser;
    const courseDetails = await req.foundCourse;
    const decodedJWT = req.user;

    let data = {
        validUser,
        courseDetails,
        decodedJWT,
        isCreator: false,
        courseEnrolled: false,
    };

    if (decodedJWT._id === courseDetails.createdBy) {
        data.isCreator = true;
    }

    if (
        JSON.stringify(validUser.enrolledCourses).includes(
            JSON.stringify(courseDetails._id)
        )
    ) {
        data.courseEnrolled = true;
    }
    
    res.render("course-details", { data: data });
};
const get_editCourse_form = async function (req, res, next) {
    const validUser = req.user;
    const courseDetails = req.foundCourse;
    const data = {
        validUser,
        courseDetails,
    };
    res.render("edit-course", { data: data });
};
const get_deleteCourse_form = function (req, res, next) {
    const validUser = req.user;
    const courseDetails = req.foundCourse;
    const data = {
        validUser,
        courseDetails,
    };
    res.render("delete-course", { data: data });
};
const get_enrollCourse = async function (req, res, next) {
    const validUser = await req.user;
    const course = await req.foundCourse;
    const data = {
        validUser,
        course,
    };
    console.log("this is:", course._id, validUser);
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
        createdBy: req.user._id,
    });
    console.log("This is aNewCourse obj:", aNewCourse);

    aNewCourse
        .save()
        .then(() => {
            // res.status(201).json({
            //     message: "New course created successfully!",
            //     course: aNewCourse,
            // });
            res.redirect("/");
        })
        .catch((err) => {
            // res.status(500).json({
            //     message: "Course did not save!",
            //     error: err,
            // });
            return console.log("course did not save");
        });

    // res.send(aNewCourse);
};
const post_editCourse_DB = async function (req, res, next) {
    const dbId = req.foundCourse;

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
    const dbInfo = await req.foundCourse;

    await Course.findByIdAndDelete(dbInfo._id, function (err) {
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
