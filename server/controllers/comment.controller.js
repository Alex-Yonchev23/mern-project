import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
    try {
        const { content, postId, userId } = req.body;

        if (!content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Не може да бъде изпратен празен коментар",
            });
        }

        if (userId !== (req.user.id || req.user._id)){
            return res.status(400).json({
                success: false,
                message: "Неразрешен достъп",
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
            return res.status(401).json({ success: false, message: 'Неразрешен достъп' });
        }

        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return next(errorHandler(404, 'Коментарът не е намерен!'))
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
            return next(errorHandler(404, 'Коментарът не е намерен!'))
        }

        if(comment.userId !== req.user._id && !req.user.isAdmin){
            return next(errorHandler(401, 'Неразрешен достъп'));
        }

        const { content } = req.body;
        if (!content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Не можете да запазите празен коментар",
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
            message: 'Коментарът е успешно редактиран.'
        });
    } catch (error) {
        next(error);
    }

}

export const deleteComment = async (req, res, next) => {
    try {
        if (!req.params.commentId) {
            return next(errorHandler(400, 'Идентификационният номер на коментара липсва'));
        }

        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return next(errorHandler(404, 'Коментарът не е намерен!'))
        }

        if (comment.userId !== req.user._id && !req.user.isAdmin) {
            return next(errorHandler(401, 'Неразрешен достъп'));
        }

        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json({
            success: true,
            message: 'Коментарът е успешно изтрит',
        });
    } catch (error) {
        next(error);
    }
}


export const getComments = async (req, res, next) => {
    if(!req.user.isAdmin)
        return next(errorHandler(403, 'Неразрешен достъп'));

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const comments = await Comment.find()
            .sort({ createdAt:sortDirection })
            .skip(startIndex)
            .limit(limit);        
        const totalComments = await Comment.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(),now.getMonth() - 1,now.getDate());
        const lastMonthComments =  await Comment.countDocuments({
            createdAt: {
                $gte: oneMonthAgo,
            }
        });

        const remainingComments = totalComments - (startIndex + limit);
        
        res.status(200).json({
            comments,
            totalComments,
            lastMonthComments,
            remainingComments,
        });

    } catch (error) {
        next(error);
    }
}
