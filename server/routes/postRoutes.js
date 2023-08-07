const express = require('express');
const postController = require('./../controllers/postController');
const router = express.Router();
const authController = require('./../controllers/authController');

router
  .route('/')
  .get(postController.getAllPosts)
  .post(/*authController.protect,*/ postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(/*authController.protect,*/ postController.updatePost)
  .delete(/*authController.protect,*/ postController.deletePost);

router
  .route('/:id/likings')
  .get(postController.getLikings)
  .post(/*authController.protect,*/ postController.handleLiking)

  router
  .route('/:id/likings/user')
  .get(/*authController.protect, */ postController.likingValue)

module.exports = router;
