const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer')

const foodfy = require('./app/controllers/foodfy')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')
const session = require('./app/controllers/session')
const users = require('./app/controllers/users')

const userValidator = require('./app/validators/userValidator')
const sessionValidator = require('./app/validators/sessionValidator')

const sessionMiddleware = require('./app/middlewares/session')

routes.get('/', foodfy.index)
routes.get('/about', foodfy.about)
routes.get('/recipes', foodfy.recipes)
routes.get('/recipes/:id', foodfy.show)
routes.get('/chefs', foodfy.chefs)
routes.get('/filter', foodfy.filter)

routes.get('/admin', function(req, res) {
  return res.render('admin/index')
})

routes.get('/admin/recipes', sessionMiddleware.onlyUsers, recipes.list)
routes.get('/admin/recipes/create', sessionMiddleware.onlyUsers, recipes.create)
routes.get('/admin/recipes/:id', sessionMiddleware.onlyUsers, recipes.show)
routes.get('/admin/recipes/:id/edit', sessionMiddleware.onlyUsers, recipes.edit)

routes.post('/admin/recipes/create', sessionMiddleware.onlyUsers, multer.array('photos', 5), recipes.post)
routes.put('/admin/recipes/:id/edit', sessionMiddleware.onlyUsers, multer.array('photos', 5), recipes.put)
routes.delete('/admin/recipes/:id/edit', sessionMiddleware.onlyUsers, multer.array('photos', 5), recipes.delete)

routes.get('/admin/chefs', sessionMiddleware.onlyUsers, chefs.list)
routes.get('/admin/chefs/create', sessionMiddleware.onlyUsers, sessionMiddleware.onlyAdmins, chefs.create)
routes.get('/admin/chefs/:id', sessionMiddleware.onlyUsers, chefs.show)
routes.get('/admin/chefs/:id/edit', sessionMiddleware.onlyUsers, sessionMiddleware.onlyAdmins, chefs.edit)

routes.post('/admin/chefs/create', sessionMiddleware.onlyUsers, sessionMiddleware.onlyAdmins, multer.array('photo', 1), chefs.post)
routes.put('/admin/chefs/:id/edit', sessionMiddleware.onlyUsers, sessionMiddleware.onlyAdmins,  multer.array('photo', 1), chefs.put)
routes.delete('/admin/chefs/:id/edit', sessionMiddleware.onlyUsers, sessionMiddleware.onlyAdmins, multer.array('photo', 1), chefs.delete)

// SESSION

routes.get('/users/login', sessionMiddleware.isLoggedRedirectToUser, session.loginForm)
routes.post('/users/login', sessionValidator.login, session.login)
routes.post('/users/logout', session.logout)

routes.get('/users/forgot-password', session.forgotForm)
routes.post('/users/forgot-password', sessionValidator.forgot, session.forgot)

routes.get('/users/reset-password', session.resetForm)
routes.post('/users/reset-password', sessionValidator.reset, session.reset)

// USERS

routes.get('/admin/users', sessionMiddleware.onlyUsers, users.list)
routes.get('/admin/users/create', sessionMiddleware.onlyUsers, sessionMiddleware.onlyAdmins, users.create)
routes.get('/admin/users/:id', sessionMiddleware.onlyUsers, users.show)
routes.get('/admin/users/:id/edit', sessionMiddleware.onlyAdmins, users.edit)

routes.post('/admin/users/create', sessionMiddleware.onlyUsers, sessionMiddleware.onlyAdmins, users.post)

routes.put('/admin/users/:id', sessionMiddleware.onlyUsers, userValidator.put, users.put)
routes.put('/admin/users/:id/edit', sessionMiddleware.onlyAdmins, sessionMiddleware.onlyUsers, users.put)

routes.delete('/admin/users/:id/edit', sessionMiddleware.onlyAdmins, sessionMiddleware.onlyUsers, sessionMiddleware.isYourAccount, users.delete)

module.exports = routes