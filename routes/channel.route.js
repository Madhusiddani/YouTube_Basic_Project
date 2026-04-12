const express = require("express");
const {createChannel, getAccountDetails, getAllDetails, getResultFromCbse} = require("../controllers/channel.controller");

const router = express.Router();

router.post("/create-channel", createChannel);

router.get("/get-account-details", getAccountDetails);

router.get("/get-all-details/:userId", getAllDetails);

router.get("/release-result/:userId", getResultFromCbse)

module.exports = router