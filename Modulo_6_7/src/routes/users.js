const express = require('express');
const routes = express.Router();

const SessionController = require('../app/controllers/SessionController')
const UserController = require('../app/controllers/UserController')
const OrderController = require('../app/controllers/OrderController')

const UserValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')

const sessionMiddleware = require('../app/middlewares/session')

// // LOGIN / LOGOUT
routes.get('/login', sessionMiddleware.isLoggedRedirectToUsers, SessionController.loginForm)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)

// // RESET PASSWORD / FORGOT PASSWORD
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
routes.post('/password-reset', SessionValidator.reset, SessionController.reset)

// // USER REGISTER
routes.get('/register', UserController.registerForm)
routes.post('/register', UserValidator.post, UserController.post)

routes.get('/', sessionMiddleware.onlyUsers, UserValidator.show, UserController.show)
routes.put('/', UserValidator.put, UserController.put)
routes.delete('/', UserController.delete)

routes.get('/ads', UserController.ads)

routes.post('/orders', sessionMiddleware.onlyUsers, OrderController.post)
routes.get('/orders', (req, res) => res.render('orders/success'))
routes.get('/orders/error', (req, res) => res.render('orders/error'))


module.exports = routes
