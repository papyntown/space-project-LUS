const express = require("express");
const {
    setPosts,
    getPosts,
    deletePosts,
} = require("../controllers/post.controller");
const router = express.Router();
// Création d'une route
router.get("/", getPosts);

// Tu va me jouer la fonction setPosts du controllers
router.post("/", setPosts);

// l'id je ne le connais pas je le récupère dans l'url

router.delete("/:id", deletePosts);

module.exports = router;
