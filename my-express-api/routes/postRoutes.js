const express = require('express');
const { createPost, getPost, updatePost, deletePost } = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/posts', verifyToken, createPost);
router.get('/posts', verifyToken, getPost);
router.put('/posts/:id', verifyToken, updatePost);
router.delete('/posts/:id', verifyToken, deletePost);

module.exports = router;
