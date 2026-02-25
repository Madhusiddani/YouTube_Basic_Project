const Video = require('../models/Video.model');
const VideoStats = require('../models/VideoStats');

// controller to insert video and video stats

const publishVideo = async (req, res) => {
    try{
        const { title, description, channelId,  category, tags} = req.body;


        // create video document

        const video = new Video({
            title, description, channelId
        });

        await video.save();

        // create video stats document

        const stats = new VideoStats({
            category, tags, video_id: video._id
        });

        await stats.save();
        return res.status(201).json({message: "Video published successfully", videoId: video._id});

    }catch(err){
        console.error("err", err);
    }
}

module.exports = { publishVideo };