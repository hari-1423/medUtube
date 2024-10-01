const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: String,
  title: String,
  description: String,
  publishedAt: Date,
  channelId: String,
  channelTitle: String
});

module.exports = mongoose.model('Video', videoSchema);

