// server.js
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const Video = require('./models/Video'); // Make sure this path is correct

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Endpoint to fetch videos with search and pagination
app.get('/api/videos', async (req, res) => {
    const { page = 1, limit = 12, search = '' } = req.query; // Default page 1, limit 12, empty search

    try {
        // Create search filter based on title or description
        const searchFilter = {
            $or: [
                { title: { $regex: search, $options: 'i' } },      // case-insensitive search in title
                { description: { $regex: search, $options: 'i' } } // case-insensitive search in description
            ]
        };

        // Fetch the videos with pagination and search filter
        const videos = await Video.find(searchFilter)
            .limit(limit * 1) // Limit to 12 videos per page
            .skip((page - 1) * limit); // Skip videos based on the page number

        // Get total number of videos for pagination calculation
        const count = await Video.countDocuments(searchFilter);

        res.status(200).json({
            videos,
            totalPages: Math.ceil(count / limit), // Total pages based on video count
            currentPage: parseInt(page),
        });
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your_database_name', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch(err => console.error('MongoDB connection error:', err))