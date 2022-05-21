// Models
const User = require("../models/User");

// get controllers
const get_register_form = function (req, res, next) {
    res.render("register");
};

// post controllers
const post_createUser = async function (req, res, next) {
    const { username, password } = req.body;
    console.log("This is req.body:", req.body);

    try {
        const aNewUser = await User.create({ username, password });
        // res.status(201).json({
        //     message: "New User created successfully!",
        //     user: aNewUser,
        // });
        console.log("This is aNewUser obj:", aNewUser);
        res.redirect("/login");
    } catch (err) {
        // res.status(500).json({
        //     message: "User did not save!",
        //     error: err,
        // });
        res.redirect("/register");
    }
};

module.exports = {
    get_register_form,
    post_createUser,
};
