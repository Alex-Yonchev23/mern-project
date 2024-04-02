import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js'

export const create = async (req,res,next) => {
    const existingPost = await Post.findOne({ title: req.body.title });
        if (existingPost) {
            return next(errorHandler(400, 'A post with this title already exists.'));
        }

    if(!req.user.isAdmin){
        return next(errorHandler(400, 'You are not allowed to create a blog post!'));
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, 'Please provide all required fields'));
    }
    const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g,'-');
    const newPost = new Post({
        ...req.body,
        slug,
        creatorId: req.user.id,
    });        

    try {
        const savedPost = await newPost.save();
        res.status(200).json({ 
            message: 'Blog post created successfully', 
            post: savedPost 
        });
    } catch (error) {
        next(error);
    }
};