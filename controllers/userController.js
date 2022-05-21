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
        .lean()
        .populate("enrolledCourses")
        .exec((err, fullUser) => {
            console.log("populated user", fullUser);
            data.validUser = fullUser;
            console.log(data);
            res.render("user", { data });
        });
};

module.exports = {
    get_enrolledCourses,
};
