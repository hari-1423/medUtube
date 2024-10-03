// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoId: { type: String, required: true },
    publishedAt: { type: Date, required: true },
    thumbnails: {
        default: { url: String },
        medium: { url: String },
        high: { url: String },
    },
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
