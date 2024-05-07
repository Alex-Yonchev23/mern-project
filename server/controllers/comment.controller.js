import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;

        if (!content.trim()) {
            return res.status(400).json({
                success: false,
                message: "You cannot submit empty comment",
            });
        }

        if (userId !== (req.user.id || req.user._id)){
            return res.status(400).json({
                success: false,
                message: "Unauthorized",
            });
        }

        const newComment = new Comment({
            content,
            postId,
            userId,
        });

        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        next(error);
    }
}


export const getPostComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).sort({
            createdAt: -1,
        });

        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}


export const likeComment = async (req, res, next) => {
    try {
        if (!req.user || (!req.user.id && !req.user._id)) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return next(errorHandler(404, 'Comment not found!'))
        }

        const userIndex = comment.likes.indexOf(req.user.id || req.user._id);
        if (userIndex === -1) {
            comment.numberOfLikes += 1;
            comment.likes.push(req.user.id || req.user._id);

        } else {
            comment.numberOfLikes -= 1;
            comment.likes.splice(userIndex, 1);
        }

        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
}


export const editComment = async (req, res, next) => {
    try {
        const comment  = await Comment.findById(req.params.commentId);
        
        if(!comment){
            return next(errorHandler(404, 'Comment not found!'))
        }

        if(comment.userId !== req.user._id && !req.user.isAdmin){
            return next(errorHandler(401, 'Unauthorized'));
        }

        const { content } = req.body;
        if (!content.trim()) {
            return res.status(400).json({
                success: false,
                message: "You can't save an empty comment",
            });
        }

        const editedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            {
                $set: {
                    content: req.body.content,
                }
            },
            {  new: true }
        );

        res.status(200).json({ 
            comment: editedComment,
            message: 'Comment edited successfully.'
        });
    } catch (error) {
        next(error);
    }

}

export const deleteComment = async (req, res, next) => {
    try {
        if (!req.params.commentId) {
            return next(errorHandler(400, 'Comment ID is missing'));
        }

        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandler(404, 'Comment not found!'))
        }

        if (comment.userId !== req.user._id && !req.user.isAdmin) {
            return next(errorHandler(401, 'Unauthorized'));
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json({
            success: true,
            message: 'Comment deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}
