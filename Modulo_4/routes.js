const express = require('express');
const routes = express.Router();
const professores = require('./professores')

routes.get('/', function(req, res) {
  return res.render("sobre")
})

routes.get('/professores', function(req, res) {
  return res.render('professores')
})

routes.get('/professores/adicionar', function (req, res) {
  return res.render('adicionar')
})

routes.get('/professores/:id/edit', professores.edit)

routes.get('/professores/:id', professores.show)

routes.post('/professores', professores.post)

routes.put('/professores', professores.put)

routes.get('/alunos', function(req, res) {
  return res.render('alunos')
})

module.exports = routes
