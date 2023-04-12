const express = require("express");
const port = 5000;
const dotenv = require("dotenv").config(); // Pour pouvoir utiliser les variables d'environnement
const app = express();
const cors = require("cors");

//Connexion à MongoDB
const connectDB = require("./config/db");
connectDB();

//Autorisation CORS
app.use(
    cors({
        origin: "http://127.0.0.1:5173",
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

// Middleware pour pouvoir lire les données de la requête
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Lorsque tu envoies une requête POST, je veux que tu ailles chercher la logique de post dans le fichier routes
app.use("/post", require("./routes/post.routes"));

// Lancer le serveur
// Notre serveur va écouter les requêtes sur le port 5000, s'il démarre avec succès, il nous le signalera dans la console
app.listen(port, () =>
    console.log(`Le serveur a démarré sur le port : ${port}`)
);
