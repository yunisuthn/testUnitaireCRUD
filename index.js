const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json());

const dbConfig = require('./DBConfig/database.config.js');
const mongoose  = require('mongoose');
var config = require('./DBConfig/_config');

// *** mongoose *** ///
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});



mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connect database');
    
}).catch(err => {
    console.log('not connect database');
    process.exit();
})
app.get('/', (req, res) => {
    res.json({'message': "Welcome to EasyNotes application"})
});

require('./Route/route')(app)
app.listen(8081, () => {
    console.log("Server listening 8081");
    
})

module.exports = app;









// const express = require("express");
// const path = require("path");
// const logger = require("morgan");
// const bodyParser = require("body-parser");
// const routes = require('./Route/route');
// const app = express();

// // Connexion à la Base de donnée
// const dbConfig = require('./DBConfig/database.config.js');
// const mongoose = require('mongoose');


// app.use(logger('dev'));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Paramaitre de connexion à la Base de donnée
// // issue #33 : utiliser le param db_prod/db_dev si env PROD/DEV 
// mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log('Connexion à la Base de Donnée avec succès ')
// }).catch(err => {
//     console.log("Problème de connexion à la Base de Donnée", err);
//     process.exit();
// });

// // API
// app.all('/', function(req, res, next) {
//     // CORS headers
//     res.header("Access-Control-Allow-Origin", ""); // restrict it to the required domain
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

//     // Set custom headers for CORS
//     res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

//     if (req.method == 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         next();
//     }
// });

// // Routes
// app.use('/', routes);

// app.use(function(req, res, next) {
//     var err = new Error('La ressource demandée n’existe pas');
//     err.status = 404;
//     next(err);
// });

// // Demarage du serveur
// app.set('port', process.env.PORT || 8081);

// const server = app.listen(app.get('port'), function() {
//     console.log('Express serveur en écoute ' + server.address().address + ':' + server.address().port);
// });


// module.exports = app;