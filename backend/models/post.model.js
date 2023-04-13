const mongoose = require("mongoose");

// Structure de la base de données
const postShema = mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
//(Nom de la collection, strucutre de la collection)
module.exports = mongoose.model("satellite", postShema);
