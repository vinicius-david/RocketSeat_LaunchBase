const express = require('express');
const routes = express.Router();

const HomeController = require('../app/controllers/HomeController')

const products = require('./products')
const users = require('./users')
const cart = require('./cart')
const orders = require('./orders')


// HOME
routes.get('/', HomeController.index)


// PRODUCTS
routes.use('/products', products)


// ALIAS
routes.get('/ads/create', function(req, res) {
  return res.redirect('/products/create')
})
routes.get('/accounts', function(req, res) {
  return res.redirect('/users/login')
})


// USERS
routes.use('/users', users)

// CART
routes.use('/cart', cart)

// ORDERS
routes.use('/orders', orders)


module.exports = routes