import express from 'express';
import { verifyToken } from "../utils/verifyUser.js";
import { create,getPosts,deletepost,editpost } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create',verifyToken, create);
router.get('/get-posts',getPosts);
router.delete('/delete-post/:postId/:creatorId', verifyToken, deletepost);
router.put('/edit-post/:postId/:creatorId' ,verifyToken, editpost);

export default router;