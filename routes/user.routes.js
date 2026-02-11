const express = require("express");
const router = express.Router();

const { createUser, getUsers } = require("../controllers/user.controller");

// Define user routes here
router.post("/register", createUser);

router.get("/get-users", getUsers);
module.exports = router;
