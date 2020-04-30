const express = require('express');
const routes = express.Router();

const multer = require('./app/middlewares/multer')
const ProductController = require('./app/controllers/ProductController')
const HomeControlles = require('./app/controllers/HomeController')

routes.get('/', HomeControlles.index)

routes.get('/products/:id', ProductController.show)
routes.get('/products/create', ProductController.create)
routes.get('/products/:id/edit', ProductController.edit)

routes.post('/products', multer.array('photos', 6), ProductController.post)
routes.put('/products', multer.array('photos', 6), ProductController.put)
routes.delete('/products', ProductController.delete)

routes.get('/ads/create', ProductController.create)


module.exports = routes