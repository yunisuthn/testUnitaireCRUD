const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('=== Test POST and GET client==', () => {

  // Test POST Client
   
   describe('=== Test POST client==', () => {
      it('create client should return the result of data', (done) => {
         chai.request(app)
            .post('/persone')
            // changer les données entrants à chaque test pour eviter les doublants
            .send({
               nom: 'javascript',
               prenom: 'nodejs'
            })
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.eql(200);
               done();
               });
      });
      it('test pas de nom', (done) => {
         chai.request(app)
            .post('/persone')
            // changer les données entrants à chaque test pour eviter les doublants
            .send({
               prenom: 'prenom'
            })
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.eql(400);
               done();
            });
      });
      it('test sas de nom et sans prenom', (done) => {
         chai.request(app)
            .post('/persone')
            // changer les données entrants à chaque test pour eviter les doublants
            .send({
               nom: '',
               prenom: '',
            })
            .end((err, res) => {
               should.not.exist(err);
               res.status.should.eql(400);
               done();
            });
      });
   });


   describe('=== Test GET client==', () => {
      // Test GET Client
      it('get client should return the result', (done) => {
         chai.request(app)
         .get('/persone')
         .end((err, res) => {
            should.not.exist(err);
            //res.status.should.eql(200);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            //  res.type.should.eql('application/json');
            done();
         });
      });
   });


   describe('=== Test UPDATE client==', () => {
      it('should update a SINGLE human on /persone/<id> PUT', function(done) {
         var personeUdpdate ={
            id: 8,
            nom:'node', 
            prenom: 'javascript'
         }
         chai.request(app)
         .put('/persone/'+personeUdpdate.id)
         .send({
            nom:personeUdpdate.nom, 
            prenom: personeUdpdate.prenom
         })
         .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            done();
         });
      });
   });
   describe('=== Test UPDATE client==', () => {
      it('should delete a SINGLE personne on /persone/<id> DELETE', function(done) {
         var personeDelete = {
            id: 10
         }
         chai.request(app)
         .delete('/persone/'+personeDelete.id)
         .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            done();
         });
      });
   });
});
