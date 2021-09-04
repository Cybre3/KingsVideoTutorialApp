const User = require("../models/User");

const get_enrolledCourses = async function (req, res, next) {
    let validUser = req.foundUser;
    const decodedJWT = req.user;
    let data = {
        validUser,
        decodedJWT,
    };

    console.log("jwt", decodedJWT);
    await User.findById(decodedJWT._id)
        .populate("enrolledCourses")
        .exec((err, allCourses) => {
            console.log(allCourses);
            res.render("user", { data, allCourses });
        });

};

module.exports = {
    get_enrolledCourses,
};
