const express = require('express');
const { requireSingIn } = require('../controllers/userController');
const { createPostController } = require('../controllers/postController');

//router object
const router = express.Router();

//create post 
router.post('/create-post', requireSingIn, createPostController);


//export 
module.exports = router;