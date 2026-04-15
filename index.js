const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

// user router

const userRouter = require("./routes/user.routes")
const channelRouter = require("./routes/channel.route");
const videoRouter =require("./routes/video.routes")

const port = process.env.PORT || 4000

const app = express();
// parsing

app.use(express.json())

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log("DB is connected")
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// endpoints

// user
app.use("/api", userRouter)

// channel
app.use("/api/channel", channelRouter)

app.get("/", (req, res) => {
    return res.send("Welcome to YouTube Backend")
})

// video
app.use("/api/video", videoRouter)

app.listen(4000, () => {
    console.log("server is running on port 4000")
})

//.  http://localhost:4000/api/create-user


