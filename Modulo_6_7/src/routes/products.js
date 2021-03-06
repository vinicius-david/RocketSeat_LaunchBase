const express = require('express');
const routes = express.Router();

const multer = require('../app/middlewares/multer')

const ProductController = require('../app/controllers/ProductController')
const SearchController = require('../app/controllers/SearchController')

const sessionMiddleware = require('../app/middlewares/session')

const Validator = require('../app/validators/product')

//SEARCH
routes.get('/search', SearchController.index)

// PRODUCT
routes.get('/create', sessionMiddleware.onlyUsers, ProductController.create)
routes.get('/:id', ProductController.show)
routes.get('/:id/edit', sessionMiddleware.onlyUsers, ProductController.edit)

routes.post('/', sessionMiddleware.onlyUsers, multer.array('photos', 6), Validator.post, ProductController.post)
routes.put('/', sessionMiddleware.onlyUsers, multer.array('photos', 6), Validator.put, ProductController.put)
routes.delete('/', sessionMiddleware.onlyUsers, ProductController.delete)


module.exports = routes
