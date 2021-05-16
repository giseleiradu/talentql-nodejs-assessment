import express from 'express';
import Post from '../../controllers/Posts';
import Comments from '../../controllers/Comments';
import checkToken from '../../middlewares/checkToken';
import validate from '../../middlewares/validations';
import postSchema from '../../middlewares/validations/posts';

const router = express.Router();

router.post('/post', checkToken, validate(postSchema.create),Post.create);
router.get('/post/:slug',Post.get);
router.get('/post/:username/private', Post.getPrivatePosts);
router.get('/all_posts',Post.getAll);
router.delete('/post/:slug', checkToken, Post.delete);
router.put('/post/:slug', checkToken, validate(postSchema.update), Post.update);
//liking and unliking
router.post('/post/:slug/like', checkToken, validate(postSchema.params, true), Post.like);
router.delete('/post/:slug/like', checkToken, validate(postSchema.params, true), Post.unlike);
// Replying to post or commenting or and uncomenting
router.post('/post/:slug/comment', checkToken, validate(postSchema.comment), Comments.create);
router.get('/post/:slug/comment', Comments.getAll);
router.delete('/post/:slug/comment/:id', checkToken, validate(postSchema.idParam, true), Comments.delete);
router.put('/post/:slug/comment/:id', checkToken, validate(postSchema.idParam, true), validate(postSchema.comment), Comments.update);
router.post('/post/:slug/comment/:id/like', checkToken, Comments.like);
router.delete('/post/:slug/comment/:id/like', checkToken, Comments.unLike);


export default router;