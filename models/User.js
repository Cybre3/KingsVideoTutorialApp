const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is Required, please enter username"],
        unique: [true, "This username already exists!"],
    },
    password: {
        type: String,
        required: [true, "Password is Required, please enter password"],
    },
    enrolledCourses: [
        {
            type: Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
});

userSchema.methods.findUser = function () {
    return mongoose.model("user").find({ _id: this._id }, function (err, user) {
        console.log("User Found!");
        return user;
    });
};

const User = mongoose.model("user", userSchema);

module.exports = User;
