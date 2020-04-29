const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer')

const foodfy = require('./app/controllers/foodfy')
const recipes = require('./app/controllers/recipes')
const chefs = require('./app/controllers/chefs')

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
routes.delete('/admin/recipes/:id/edit', recipes.delete)

routes.get('/admin/chefs', chefs.list)
routes.get('/admin/chefs/create', chefs.create)
routes.get('/admin/chefs/:id', chefs.show)
routes.get('/admin/chefs/:id/edit', chefs.edit)

routes.post('/admin/chefs/create', multer.array('photo', 1), chefs.post)
routes.put('/admin/chefs/:id/edit', chefs.put)
routes.delete('/admin/chefs/:id/edit', chefs.delete)

module.exports = routes