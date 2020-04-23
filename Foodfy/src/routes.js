const express = require('express');
const routes = express.Router();


routes.get('/', function(req, res) {
  return res.render('foodfy.njk')
})
routes.get('/about', function(req, res) {
  return res.render('about.njk')
})
routes.get('/recipes', function(req, res) {
  return res.render('recipes.njk')
})


module.exports = routes