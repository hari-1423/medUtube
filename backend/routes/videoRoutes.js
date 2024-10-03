// backend/routes/videoRoutes.js
const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);  // Return videos in JSON format
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
