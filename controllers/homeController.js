const get_homeLayout = async function (req, res, next) {
    const validUser = await req.foundUser;
    const allCourses = await req.allCourses;
    const decodedJWT = await req.user;
    const data = {
        validUser,
        allCourses,
        decodedJWT,
    };

    console.log("homeController course", data.allCourses);
    console.log("homeController user", data.validUser);
    console.log("homeController decoded jwt", data.decodedJWT);

    res.render("home", { data: data });
};

module.exports = {
    get_homeLayout,
};
