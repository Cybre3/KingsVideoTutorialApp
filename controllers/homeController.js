const get_homeLayout = async function (req, res, next) {
    const validUser = req.user;
    const allCourses = await req.allCourses;

    console.log('course', allCourses);
    console.log('user', validUser)

    res.render("home", { user: validUser, courses: allCourses });
};

module.exports = {
    get_homeLayout,
};
