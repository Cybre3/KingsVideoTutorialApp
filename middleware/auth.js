const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
        try {
        const token = req.cookies.token;
        if (!token) return res.status(403).render("home");
        
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