const express = require('express');
const routes = express.Router();

const Recipes = require('./app/controllers/recipes')

routes.get('/', Recipes.listMain)
routes.get('/about', function(req, res) {
  return res.render('about.njk')
})
routes.get('/recipes', Recipes.listAll)
routes.get('/recipes/:id', Recipes.show)

module.exports = routes