import Post from '../models/post.model.js';
import Comment from "../models/comment.model.js";
import { errorHandler } from '../utils/error.js';

const cyrillicToLatinMapping = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'G', 'г': 'g',
    'Д': 'D', 'д': 'd',
    'Е': 'E', 'е': 'e',
    'Ж': 'Zh', 'ж': 'zh',
    'З': 'Z', 'з': 'z',
    'И': 'I', 'и': 'i',
    'Й': 'Y', 'й': 'y',
    'К': 'K', 'к': 'k',
    'Л': 'L', 'л': 'l',
    'М': 'M', 'м': 'm',
    'Н': 'N', 'н': 'n',
    'О': 'O', 'о': 'o',
    'П': 'P', 'п': 'p',
    'Р': 'R', 'р': 'r',
    'С': 'S', 'с': 's',
    'Т': 'T', 'т': 't',
    'У': 'U', 'у': 'u',
    'Ф': 'F', 'ф': 'f',
    'Х': 'H', 'х': 'h',
    'Ц': 'C', 'ц': 'c',
    'Ч': 'Ch', 'ч': 'ch',
    'Ш': 'Sh', 'ш': 'sh',
    'Щ': 'Sht', 'щ': 'sht',
    'Ъ': 'A', 'ъ': 'a', 
    'Ь': 'I', 'ь': 'i', 
    'Ю': 'Yu', 'ю': 'yu',
    'Я': 'Ya', 'я': 'ya'
};

const transliterate = (text) => {
    let transliteratedText = '';
    for (const char of text) {
        transliteratedText += char in cyrillicToLatinMapping ? cyrillicToLatinMapping[char] : char;
    }
    return transliteratedText;
};

export const create = async (req, res, next) => {
    const existingPost = await Post.findOne({ title: req.body.title });
    if (existingPost) {
        return next(errorHandler(400, 'Публикация с това заглавие вече съществува.'));
    }

    if (!req.user.isAdmin) {
        return next(errorHandler(400, 'Нямате право да създавате блог публикации!'));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Моля, предоставете всички задължителни полета'));
    }

    const slug = transliterate(req.body.title)
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '-');

    const newPost = new Post({
        ...req.body,
        slug,
        creatorId: req.user.id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(200).json({
            message: 'Блог публикацията е създадена успешно',
            post: savedPost
        });
    } catch (error) {
        next(error);
    }
};

export const getPosts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
            ...(req.query.creatorId && { creatorId: req.query.creatorId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.searchTerm && {
                $or: [
                    {
                        title: {
                            $regex: req.query.searchTerm,
                            $options: 'i'
                        }
                    },
                    {
                        content: {
                            $regex: req.query.searchTerm,
                            $options: 'i'
                        }
                    },

                ],
            }),
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: {
                $gte: oneMonthAgo
            }
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    } catch (error) {
        next(error);
    }
};

export const deletepost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.creatorId) {
        return next(errorHandler(403, 'Неразрешен достъп'));
    }

    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return next(errorHandler(404, 'Публикацията не е намерена'));
        }

        await Comment.deleteMany({ postId: post._id });

        await Post.findByIdAndDelete(post._id);

        res.status(200).json({
            success: true,
            message: 'Блог публикацията и всички коментари към нея бяха изтрити успешно',
        });
    } catch (error) {
        next(error);
    }
};

export const editpost = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.creatorId) {
        return next(errorHandler(403, 'Неразрешен достъп'));
    }

    try {
        const existingPost = await Post.findById(req.params.postId);

        if (!existingPost) {
            return next(errorHandler(404, 'Публикацията не е намерена'));
        }

        const newTitle = req.body.title.trim();
        const newContent = req.body.content.trim();
        const newImage = req.body.image;
        const newCategory = req.body.category;

        if (!newTitle || (!newContent.trim() || !newContent.replace(/<\/?[^>]+(>|$)/g, "").trim())) {
            return res.status(400).json({
                success: false,
                message: 'Заглавието и съдържанието не могат да бъдат празни.',
            });
        }

        const newSlug = transliterate(newTitle)
            .replace(/[^a-zA-Z0-9]/g, '-') 
            .replace(/-{2,}/g, '-') 
            .toLowerCase();

        if (newSlug === existingPost.slug && newTitle === existingPost.title && newContent === existingPost.content && existingPost.image === newImage && existingPost.category === newCategory) {
            return res.status(400).json({
                success: false,
                message: 'Няма нови промени.',
            });
        }
            
        if (newSlug !== existingPost.slug) {
            const existingSlug = await Post.findOne({ slug: newSlug });
            if (existingSlug) {
                return res.status(400).json({
                    success: false,
                    message: 'Публикация със същото заглавие вече съществува.',
                });
            }
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: {
                    title: newTitle,
                    content: newContent,
                    category: req.body.category,
                    image: req.body.image,
                    slug: newSlug
                }
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Блог публикацията е успешно редактирана',
            post: updatedPost,
        });

    } catch (error) {
        next(error);
    }
};
