const mongoose = require('mongoose');

// video schema definition

const VideoSchema = new mongoose.Schema({
    title :{
        type: String,
    },
    description :{
        type: String,
    },

    channelId:{
        type: mongoose.Schema.Types.ObjectId, // reference to Channel model
        ref: 'Channel'
    }
}, {
    timestamps: true, // when the video is created and updated easily tracked
})

// video model creation

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;