const PostModel = require("../models/post.model");

// Je récupère les données de la base de données
module.exports.getPosts = async (req, res) => {
    const posts = await PostModel.find();
    res.status(200).json(posts);
};

// Je mets des données dans la base de données
module.exports.setPosts = async (req, res) => {
    // On vérifie si le author est vide
    if (!req.body.author) {
        res.status(400).json({ author: "Le author est vide" });
    }

    const post = await PostModel.create({
        author: req.body.author,
        message: req.body.message,
    });
    res.status(200).json(post);
};

// Supprimer un post
module.exports.deletePosts = async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
        res.status(400).json({
            author: "Post introuvable avec l'id : " + req.params.id,
        });
    }
    await post.remove();
    res.status(200).json({ author: "Post supprimé " + req.params.id });
};
// Modifier un post
module.exports.editPosts = async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
        res.status(400).json({
            message: "Post introuvable avec l'id : " + req.params.id,
        });
    }

    const updatePost = await PostModel.findByIdAndUpdate(post, req.body, {
        new: true,
    });
    res.status(200).json(updatePost);
};
