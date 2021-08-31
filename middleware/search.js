// Models
const Course = require("../models/Course");

// methods
const findMe = async function (req, res, next) {

    const cred = "612a93a6ab0e4761646822e8";

    try {
        const data = await Course.findById(cred, function (err, data) {
            if (err) return console.log(err);
            console.log("Middleware: Found!", data);
            req.foundData = data;
            return data;
        });
    } catch (err) {
        console.log(err);
    }
    // const string = 'working' + credential;

    // return string;
    next();
};


module.exports = {
    findMe,
};
