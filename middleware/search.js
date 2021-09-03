// Models
const Course = require("../models/Course");
const User = require("../models/User");

// methods
const findMyCourse = async function (req, res, next) {

    const cred = "612f07b510d4710d24288ad6";

    try {
        const data = await Course.findById(cred, function (err, data) {
            if (err) return console.log(err);
            console.log("Middleware: Found!", data);
            req.foundData = data;
            return data;
        }).lean();
    } catch (err) {
        console.log(err);
    }
    // const string = 'working' + credential;

    // return string;
    next();
};

const findMyUser = async function (req, res, next) {

    const cred = "612f07b510d4710d24288ad6";

    try {
        const data = await User.findById(cred, function (err, data) {
            if (err) return console.log(err);
            console.log("Middleware: Found!", data);
            req.foundData = data;
            return data;
        }).lean();
    } catch (err) {
        console.log(err);
    }
    // const string = 'working' + credential;

    // return string;
    next();
};


module.exports = {
    findMyCourse,
    findMyUser
};
