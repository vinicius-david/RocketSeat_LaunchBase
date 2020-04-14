const express = require('express');
const routes = express.Router();
const professores = require('./app/controladores/professores')
const alunos = require('./app/controladores/alunos')

routes.get('/', function(req, res) {
  return res.render("sobre")
})

routes.get('/professores', professores.lista)
routes.get('/professores/adicionar', professores.adicionar)
routes.get('/professores/:id/edit', professores.edit)
routes.get('/professores/:id', professores.show)
routes.post('/professores', professores.post)
routes.put('/professores', professores.put)
routes.delete('/professores', professores.delete)

routes.get('/alunos', alunos.lista)
routes.get('/alunos/adicionar', alunos.adicionar)
routes.get('/alunos/:id/edit', alunos.edit)
routes.get('/alunos/:id', alunos.show)
routes.post('/alunos', alunos.post)
routes.put('/alunos', alunos.put)
routes.delete('/alunos', alunos.delete)


module.exports = routes