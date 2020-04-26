const express = require('express');
const routes = express.Router();

const Foodfy = require('./app/controllers/foodfy')
const Admin = require('./app/controllers/admin')
const Chef = require('./app/controllers/chefs')

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

routes.get('/admin/chefs', Chef.list)
routes.get('/admin/chefs/create', Chef.create)
routes.get('/admin/chefs/:id', Chef.show)
routes.get('/admin/chefs/:id/edit', Chef.edit)

routes.post('/admin/chefs/create', Chef.post)
routes.put('/admin/chefs/:id/edit', Chef.put)
routes.delete('/admin/chefs/:id/edit', Chef.delete)

module.exports = routes