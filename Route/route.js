

module.exports = (app) => {
    const controller = require ('../Controller/controller.js');

    app.post('/persone', controller.create );
    app.get('/persone', controller.findAll );
    app.put('/persone/:IdPersonne', controller.update );
    app.delete('/persone/:IdPersonne', controller.delete );
}





