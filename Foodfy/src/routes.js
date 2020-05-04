const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer')

const foodfy = require('./app/controllers/foodfy')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const session = require('./app/controllers/session')
const users = require('./app/controllers/users')

routes.get('/', foodfy.index)
routes.get('/about', foodfy.about)
routes.get('/recipes', foodfy.recipes)
routes.get('/recipes/:id', foodfy.show)
routes.get('/chefs', foodfy.chefs)
routes.get('/filter', foodfy.filter)

routes.get('/admin', function(req, res) {
  return res.render('admin/index')
})

routes.get('/admin/recipes', recipes.list)
routes.get('/admin/recipes/create', recipes.create)
routes.get('/admin/recipes/:id', recipes.show)
routes.get('/admin/recipes/:id/edit', recipes.edit)

routes.post('/admin/recipes/create', multer.array('photos', 5), recipes.post)
routes.put('/admin/recipes/:id/edit', multer.array('photos', 5), recipes.put)
routes.delete('/admin/recipes/:id/edit', multer.array('photos', 5), recipes.delete)

routes.get('/admin/chefs', chefs.list)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs/create', multer.array('photo', 1), chefs.post)
routes.put('/admin/chefs/:id/edit',  multer.array('photo', 1), chefs.put)
routes.delete('/admin/chefs/:id/edit', multer.array('photo', 1), chefs.delete)

// SESSION

routes.get('/users/login', session.loginForm)
routes.post('/users/login', session.login)
routes.post('/users/logout', session.logout)

routes.get('/users/forgot-password', session.forgotForm)
routes.post('/users/forgot-password', session.forgot)

routes.get('/users/reset-password', session.resetForm)
routes.post('/users/reset-password', session.reset)

// USERS

routes.get('/admin/users', users.list)
routes.get('/admin/users/create', users.create)
routes.get('/admin/users/:id', users.show)
routes.get('/admin/users/:id/edit', users.edit)

routes.post('/admin/users/create', users.post)

routes.put('/admin/users/:id/edit', users.put)

routes.delete('/admin/users/:id/edit', users.delete)

module.exports = routes