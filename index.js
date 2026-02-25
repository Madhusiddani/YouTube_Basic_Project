const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// user routes import 
const userRoutes = require('./routes/user.routes');
const channelRoutes = require('./routes/channel.route');
const videoRoutes = require('./routes/video.route');


dotenv.config();
const PORT = process.env.PORT || 4000
const app = express();
app.use(express.json());

// mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Could not connect to MongoDB...', err.message));

    // endpoints
    //user routes
app.use('/api/users', userRoutes);
//channel routes
app.use('/api/channels', channelRoutes);

app.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome to YouTube Backend API" });
});
//video routes
app.use('/api/videos', videoRoutes);

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});


//. http://localhost
