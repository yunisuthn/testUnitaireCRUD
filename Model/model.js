const mongoose = require('mongoose')

const PersonneSchema = mongoose.Schema({
    _id: Number,
    nom: String,
    prenom: String
},{
    timestamps: true
});

module.exports = mongoose.model('Personne', PersonneSchema);