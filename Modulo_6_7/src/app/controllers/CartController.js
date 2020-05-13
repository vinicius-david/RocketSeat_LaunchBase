const Cart = require('../../lib/cart')
const LoadProductsService = require('../services/LoadProductService')

module.exports = {
  async index(req, res) {
    try {

      let { cart } = req.session
      // cart = ''

      // cart manager
      cart = Cart.init(cart)

      return res.render('cart/index', { cart })
      
    } catch (err) {
      console.error(err)
    }
  },
  async addOne(req, res) {
    try {

      // get product id and product
      const { id } = req.params
      const product = await LoadProductsService.load('product', { where: { id } })

      // get cart
      let { cart } = req.session
      // cart = ''

      // add product to cart
      cart = Cart.init(cart).addOne(product)

      // update session cart
      req.session.cart = cart

      res.redirect('/cart')
    } catch (error) {
      console.error(error)
    }
  },
  removeOne(req,res) {
    try {

      // get product id
      let { id } = req.params
      
      // get session cart
      let { cart } = req.session

      if (!cart) return res.redirect('/cart')

      // cart manager
      cart = Cart.init(cart).removeOne(id)

      // update cart
      req.session.cart = cart

      return res.redirect('/cart')

    } catch (error) {
      console.error(error)
    }
  },
  delete(req,res) {
    try {

      let { cart } = req.session
      let { id } = req.params

      if (!cart) return

      req.session.cart = Cart.init(cart).delete(id)

      return res.redirect('/cart')
      
    } catch (error) {
      console.error(error)
    }
  }
}