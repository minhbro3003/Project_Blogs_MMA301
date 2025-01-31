const postModel = require("../models/postModel");

//create post
const createPostController = async (req, res) => {
    try {
        const { title, description } = req.body;
        //validate
        if (!title || !description) {
            return res.status(400).send({
                success: false,
                message: "Title and description are required",
            });
        }
        // Check authentication
        if (!req.auth || !req.auth._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not logged in",
            });
        }
        const post = await postModel({
            title,
            description,
            postedBy: req.auth._id,
        }).save();
        res.status(201).send({
            success: true,
            message: "Post created successfully",
            post,
        });
        console.log(req);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error api",
            error,
        });
    }
};

module.exports = { createPostController };
