// const Channel = require('../models/Channel.model');
// const User = require('../models/User.model');
// const mongoose = require('mongoose');

// // api to create a new channel

// const createChannel = async (req, res) => {
//     try {
//         const { ownerId, ChannelName, about } = req.body;

//         // if role === creator
//         // create a new channel instance

//         const newChannel = new Channel({ ownerId, ChannelName, about });


//         //save the channel to the database

//         await newChannel.save();

//         return res.status(201).json({message: "Channel created successfully", channel: newChannel});

//     }catch(err){


//         console.error("err", err);
//     }

//     return res.status(500).json({error: "Internal Server Error"});

// };
// // get account details by id

// const getAccountDetails = async (req, res) => {
//     try{
//         const {ownerId} = req.params;
//         //logic

//         const data = await User.aggregate([ // aggregation pipeline array

//     //stage1
//     {
//         $match:{ // match the document with userId
//             _id: new mongoose.Types.ObjectId(ownerId)
//         }
//     },

//     //stage2
//     {
//         $lookup:{
//             from: "channels", // collection name in db
//             localField: "_id",
//             foreignField: "ownerId",
//             as: "channelDetails"
//         }
//     },

//     //stage3
//     {
//         $unwind: {
//             path: "$details"
//         }

//     },
//     //stage4
//     {
//         $project:{
//             channelName: 1,
//             about: 1
//         }
//     }


//     ]);

//     return res.status(200).json({message: "Account details fetched successfully", data});
//     }catch(err){
//         console.error("err", err);
//     }
// }

// module.exports = { createChannel, getAccountDetails };


const mongoose = require("mongoose");
const Channel = require("../models/Channel.model");
const User = require("../models/User.model");

// api to create channel
const createChannel = async (req, res) => {
  try {
    const { ownerId, channelName, about } = req.body;

    const newChannel = new Channel({
      ownerId,
      channelName,
      about,
    });

    await newChannel.save();

    return res
      .status(201)
      .json({ message: "Channel created successfully", channel: newChannel });

  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get account details
const getAccountDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    // // validate userId
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //   return res.status(400).json({ error: "Invalid userId" });
    // }

    const data = await User.aggregate([
      // stage 1
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },

      // stage 2
      {
        $lookup: {
          from: "channels",
          localField: "_id",
          foreignField: "ownerId",
          as: "details",
        },
      },

      // stage 3
      {
        $unwind: {
          path: "$details",
          preserveNullAndEmptyArrays: true,
        },
      },

      // stage 4
      {
        $project: {
          _id: 0,
          userName: 1,
          email: 1,
          channelName: "$details.channelName",
          about: "$details.about",
        },
      },
    ]);

    return res.status(200).json({
      message: "data fetched",
      data,
    });

  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// controller to get user deatils , channel, video and video stats can be added here

const getAllDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const data = await User.aggregate([

      // logic

      // stage 1

      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId)
        }
      },

      // stage 2 -> perform join between two collections users and channels

      {
        $lookup: {
          from : "channels",
          localField: "_id",
          foreignField: "ownerId",
          as: "channels"
        }
      },

      //stage 3 

      {
        $lookup: {
          from: "videos",
          localField: "channels._id",
          foreignField: "channelId",
          as: "videos"
        } 
      },

      // stage 4

      {
        $lookup: {
          from: "videostats",
          localField: "videos._id",
          foreignField: "video_id",
          as: "stats"
        }
      },

      // stage 5

      {
        // operation name 
        $addFields: {
          // new field name - your choice
          videos: {
            $map: {
              // iterate through videos array
              input: "$videos",
              // for each video return the following like [{v1}, {v2},...]
              // stats : [ {stat1}, {stat2},...]
              as: "video",
              // video: {_id:..., title:..., description:...}; comes inside of this object and find the stats for this video
              in: {
                $mergeObjects: [
                  "$$video",
                  {
                    stats: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$stats",
                            as: "stat",
                            cond: { $eq: ["$$stat.video_id", "$$video._id"] }
                          }
                        },
                        0
                      ]
                    }
                  }
                ]
              }
            }
          }
        }
      },
    ]);

    return res.status(200).json({ message: "All details fetched successfully", data });
  } catch (err) {
    console.log("err", err);
  }
}
module.exports = { createChannel, getAccountDetails, getAllDetails };
