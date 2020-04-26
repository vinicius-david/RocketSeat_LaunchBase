const express = require('express');
const routes = express.Router();

const Foodfy = require('./app/controllers/foodfy')
const Admin = require('./app/controllers/admin')

routes.get('/', Foodfy.index)
routes.get('/about', Foodfy.about)
routes.get('/recipes', Foodfy.recipes)
routes.get('/recipes/:id', Foodfy.show)

routes.get('/admin/recipes', Admin.recipes)
routes.get('/admin/recipes/create', Admin.create)
routes.get('/admin/recipes/:id', Admin.show)
routes.get('/admin/recipes/:id/edit', Admin.edit)

routes.post('/admin/recipes/create', Admin.post)
routes.put('/admin/recipes/:id/edit', Admin.put)
routes.delete('/admin/recipes/:id/edit', Admin.delete)

module.exports = routes