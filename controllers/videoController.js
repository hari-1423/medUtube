const axios = require('axios');
const Video = require('../models/videoModel');

// YouTube API and Channels
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const channels = [
  { channelId: 'UC07-dOwgza1IguKA86jqxNA', channelName: 'WHO' },
  { channelId: 'UC1YMQFxaWwoUQEkyDwaYr3w', channelName: 'AIIMS Delhi' },
];

// Fetch videos from a single channel
async function fetchVideosFromChannel(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${AIzaSyDtCiqrb7qtFqNv0LeubkXRKFiUx-cmXm0}&channelId=${UC07-dOwgza1IguKA86jqxNA}&part=snippet,id&order=date&maxResults=50`;
  const response = await axios.get(url);
  return response.data.items;
}

// Store videos in MongoDB
async function storeVideos(videos) {
  for (let video of videos) {
    const videoExists = await Video.findOne({ videoId: video.id.videoId });
    if (!videoExists) {
      const newVideo = new Video({
        videoId: video.id.videoId,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        channelId: video.snippet.channelId,
        channelTitle: video.snippet.channelTitle,
      });
      await newVideo.save();
    }
  }
}

// Fetch and store videos from all channels
exports.fetchAndStoreVideos = async (req, res) => {
  try {
    const fetchVideosPromises = channels.map(channel =>
      fetchVideosFromChannel(channel.channelId)
    );

    const videosFromAllChannels = await Promise.all(fetchVideosPromises);
    const allVideos = videosFromAllChannels.flat();

    await storeVideos(allVideos);
    res.status(200).json({ message: 'Videos fetched and stored successfully' });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

// Advanced search and pagination
exports.getVideos = async (req, res) => {
  const { searchQuery = '', page = 1, limit = 12 } = req.query;
  const searchRegex = new RegExp(searchQuery, 'i');

  try {
    const videos = await Video.find({
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalVideos = await Video.countDocuments({
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    });

    res.status(200).json({
      videos,
      totalPages: Math.ceil(totalVideos / limit),
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};
