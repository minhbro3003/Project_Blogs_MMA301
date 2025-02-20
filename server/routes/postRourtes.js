const express = require('express');
const { requireSignIn } = require('../controllers/userController');
const { createPostController, updatePostController, getAllPostsController, getUserPostsController } = require('../controllers/postController');

//router object
const router = express.Router();

//create post 
router.post('/create-post', requireSignIn, createPostController);
//get all posts
router.get('/get-all-posts', getAllPostsController);
//update post 
router.post('/update-post', requireSignIn, updatePostController);

//get user post 
router.get('/get-user-post', requireSignIn, getUserPostsController)

//export 
module.exports = router;