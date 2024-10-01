// backend/routes/videoRoutes.js
const express = require('express');
const { fetchAndStoreVideos, getVideos } = require('../controllers/videoController');

const router = express.Router();

// Route to fetch and store videos from YouTube
router.get('/fetch', fetchAndStoreVideos);

// Route to get videos from MongoDB
router.get('/videos', getVideos);

module.exports = router;
