const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const videoRoutes = require('./routes/videoRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', videoRoutes);

mongoose
  .connect('mongodb://localhost:27017/your_db_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5002, () => {
      console.log('Server running on http://localhost:5002');
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));
