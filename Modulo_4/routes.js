const express = require('express');

const routes = express.Router()

routes.get('/', function(req, res) {
  return res.render("sobre")
})

routes.get('/professores', function(req, res) {
  return res.send('Professores')
})

routes.get('/alunos', function(req, res) {
  return res.send('Alunos')
})

module.exports = routes
