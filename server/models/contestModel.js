const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const urlValidator = /^https?:\/\/.*/;

const photoSchema = new mongoose.Schema({
    photoUrl: {
        type: String,
        required: true,
        unique: true,
        validate: [
            urlValidator,
            "Image url must start with http:// or https://",
        ],
    },
    photographer: {type: ObjectId, ref: "User"},
    likes: []
});

const contestSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        titleImg: {
            type: String,
            required: true,
            validate: [
                urlValidator,
                "Image url must start with http:// or https://",
            ],
        },
        authorId: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        photos: {type: [[photoSchema]], default: []},
        prize: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Contest", contestSchema);
