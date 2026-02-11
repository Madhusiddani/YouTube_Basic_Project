const User = require('../models/User.model');

exports.createUser = async (req, res) => {
    try {
        const { username, email } = req.body;

        const newUser = new User({ username, email });
        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// function to get user details by ID

const getUsers = async (req, res) => {
    try {
        //Pagination - page & limit

        // get page number
        const page = parseInt(req.query.page) || 1;
        // get the set limit
        const limit = parseInt(req.query.limit) || 2;
        // how many docs / users to skip
        const skip = (page - 1) * limit;

        // pipeline

        const data = await User.aggregate([
            //stage1
            {
                $sort: { createdAt: -1 } // recently created users will come at top
            },
            //stage 2
            {
                $skip: skip
            },
            //stage3
            {
                $limit: limit
            },
        ]);

        // return response
        // 200 - success (ok)
        res.status(200).json({message: "Users retrieved successfully", data: data});
    } catch (error) {
        console.error("err", error);
    }
};
exports.getUsers = getUsers;  