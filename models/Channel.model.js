const mongoose = require('mongoose');

// Channel schema definition

const ChannelSchema = new mongoose.Schema({
    ownerId:{
        type: mongoose.Schema.Types.ObjectId, // reference to User model
        ref: 'User'
    },
    ChannelName:{
        type: String,
    },

    about :{
        type: String,
    },
}, {
    timestamps: true, // when the user is created and updated easily tracked
});

// Channel model creation

const Channel = mongoose.model('Channel', ChannelSchema);
module.exports = Channel;