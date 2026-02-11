const mongoose = require('mongoose');

// Channel schema definition

const VideoStatsSchema = new mongoose.Schema({
    video_id :{
        type: mongoose.Schema.Types.ObjectId, // reference to Video model
        ref: 'Video'
    },
    views:{
        type: Number,
        default: 0
    },
    likes :{
        type: Number,
        default: 0
    },

    duration :{
        type: String,
    },
    dislikes :{
        type: Number,
        default: 0
    },
    category :{
        type: String,
    },
    tags :{
        type: [String],
    },

    }, {
    timestamps: true, // when the user is created and updated easily tracked
});

// VideoStats model creation

const VideoStats = mongoose.model('VideoStats', VideoStatsSchema);
module.exports = VideoStats;