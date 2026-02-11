const mongoose = require('mongoose');

// user schema definition

const userSchema = new mongoose.Schema({
    username:{
        type: String,
    },

    email:{
        type: String,
    },
    role :{
        type: String,
        enum: ['viewer', 'creator'],
        default: 'viewer'
    },
}, {
    timestamps: true, // when the user is created and updated easily tracked
});

// user model creation

const User = mongoose.model('User', userSchema);
module.exports = User;