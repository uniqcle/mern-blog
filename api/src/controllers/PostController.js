import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user").exec();

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({
            message: "Не удалось получить статьи",
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: "after" },
        );

        if (!doc) {
            return res.status(404).json({
                message: "Статья не найдена",
            });
        }

        res.status(200).json(doc);
    } catch (err) {
        res.status(500).json({
            message: "Не удалось получить статьи",
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });

        const post = await doc.save();

        return res.status(200).json(post);
    } catch (err) {
        res.status(500).json({
            message: "Не удалось создать статью",
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndDelete({
            _id: postId,
        });

        if (!doc) {
            return res.status(404).json({
                message: "Статья не найдена",
            });
        }

        res.status(200).json({
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            message: "Не удалось удалить статью",
        });
    }
};
