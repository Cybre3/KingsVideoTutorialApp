const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please enter a title!"],
        unique: [true, "This title already exists!"],
    },
    description: {
        type: String,
        required: [true, "Please enter details about your title!"],
        maxlength: 50,
    },
    imageUrl: {
        type: String,
        required: [true, "Please enter an image url!"],
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: [Date, String],
        required: true,
        default: Date.now,
    },
    usersEnrolled: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Course = mongoose.model("course", courseSchema);

module.exports = Course;
