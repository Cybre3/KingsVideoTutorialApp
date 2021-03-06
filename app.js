// NPM Library imports
var createError = require("http-errors");
var express = require("express");
const expHbs = require("express-handlebars");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

// Route Handlebars Templates
var homeRouter = require("./routes/home");
var loginRouter = require("./routes/login");
var logoutRouter = require("./routes/logout");
var registerRouter = require("./routes/register");
var courseRouter = require("./routes/course");
var userRouter = require("./routes/user");

var app = express();

// view engine setup
const layoutPath = path.join(__dirname, "/views/layouts");

app.engine(
    "hbs",
    expHbs({
        defaultLayout: "main",
        extname: ".hbs",
        layoutsDir: layoutPath,
        partialsDir: __dirname + "/views/partials",
    })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes Defined
app.use("/", homeRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/register", registerRouter);
app.use("/course", courseRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.render("404");
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error", { layout: false });
});

// mongoDB connection
mongoose
    .connect(
        "mongodb+srv://@cluster0.g2ipk.mongodb.net/?retryWrites=true&w=majority",
        {
            dbName: process.env.DB_NAME,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((res) => console.log("db connected"))
    .catch((err) => console.log(err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Testing Mongoose db.once method");
});

module.exports = app;
