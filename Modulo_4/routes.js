<<<<<<< HEAD
const express = require('express');
const routes = express.Router();
const professores = require('./controladores/professores')
const alunos = require('./controladores/alunos')

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
=======
const express = require('express');
const routes = express.Router();
const professores = require('./controladores/professores')
const alunos = require('./controladores/alunos')

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
>>>>>>> 82876af058933e7ca96427a1734539b283aee1f8
