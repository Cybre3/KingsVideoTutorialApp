const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
    const token = await req.cookies.token;
    const allCourses = await req.allCourses;
    const data = {
        token,
        allCourses
    }

    console.log("middleware auth, course", data);

    try {
        if (!token)
            return res.render("home", { data: data });

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }

    // console.log("this is auth token", authToken);
};

module.exports = { auth };
