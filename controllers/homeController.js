const get_homeLayout = function (req, res, next) {
    const validUser = req.user;

    console.log(req.user);

    res.render("home", { user: validUser });
};

module.exports = {
    get_homeLayout,
};
