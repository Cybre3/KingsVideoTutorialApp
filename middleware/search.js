// Models
const Course = require("../models/Course");
const User = require("../models/User");

// methods
const findMyCourse = async function (req, res, next) {
    const cred = req.params.id;

    try {
        const data = await Course.findById(cred).lean();
        console.log("Middleware: Search a course, Found!", data);
        req.foundCourse = data;
        next();
    } catch (err) {
        console.log(err);
    }
    // const string = 'working' + credential;

    // return string;
};

const findMyUser = async function (req, res, next) {
    const userId = req.user._id;
    console.log(req.user);

    let data = await User.findById(userId).lean();
    // data.populate("enrolledCourses").exec();
    // .then((data) => {
    // })
    // .catch((err) => console.log(err));

    req.foundUser = data;
    console.log("Middleware: Search a user, Found!", data);
    next();
    // const string = 'working' + credential;

    // return string;
};

const findAllCourses = async function (req, res, next) {
    try {
        const data = await Course.find({}).lean();
        req.allCourses = data;
        console.log("Middleware: Search all courses, Found!", data);
        next();
    } catch (err) {
        console.log(err);
    }
    // const string = 'working' + credential;

    // return string;
};

module.exports = {
    findMyCourse,
    findMyUser,
    findAllCourses,
};
