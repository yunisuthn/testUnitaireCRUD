const Personne = require('../Model/model');

exports.create = (req, res) => {
    if(!req.body.nom) {
        return res.status(400).send({
            message: "Nom du personne can not be empty"
        })
    }


    var compt = 0;
    var id = 0;
    Personne.find()
    .then(person => {
        // res.send(eleve);
        for (let i = 0; i < person.length; i++) {
            if (person[i]._id>compt) {
                compt = person[i]._id
            }
        }
        const personne = new Personne({
            _id: compt+1,
            nom: req.body.nom,
            prenom: req.body.prenom
        })

        personne.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error"
            });
        }); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'some error'
        });
    });
};



exports.findAll = (req, res) => {
    Personne.find()
    .then(person => {
        res.send(person);
        console.log(person);
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'some error'
        });
    });
    
    
};


exports.update = (req, res) => {
    // Validate Request
    if(!req.body.nom) {
        return res.status(400).send({
            message: "Nom content can not be empty"
        });
    }
    // Find note and update it with the request body
    Personne.findByIdAndUpdate(req.params.IdPersonne, {
        nom: req.body.nom || "Untitled Note",
        prenom: req.body.prenom
    }, {new: true})
    .then(person => {
        if(!person) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.IdPersonne
            });
        }
        res.send(person);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.IdPersonne
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.IdPersonne
        });
    });
}



exports.delete = (req, res) => {
    Personne.findByIdAndRemove(req.params.IdPersonne)
    .then(person => {
        if(!person) {
            return res.status(404).send({
                message: "Personne not found with id " + req.params.IdPersonne
            });
        }
        res.send({message: "Personne deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Personne not found with id " + req.params.IdPersonne
            });                
        }
        return res.status(500).send({
            message: "Could not delete Personne with id " + req.params.IdPersonne
        });
    });
}