const LoadProductService = require('../services/LoadProductService')
const LoadOrderService = require('../services/LoadOrderService')

const User = require('../models/User')
const Order = require('../models/Order')

const Cart = require('../../lib/cart')
const mailer = require('../../lib/mailer')


const email = (seller, product, buyer) => `
  <h2>Olá ${seller.name}</h2>
  <p>Você tem um novo pedido de compra do seu produto!</p>
  <p>Produto: ${product.name}</p>
  <p>Preço: ${product.formattedPrice}</p>
  <p><br/><br/></p>
  <h3>Dados do comprador</h3>
  <p>${buyer.name}</p>
  <p>${buyer.email}</p>
  <p>${buyer.adress} - ${buyer.cep}</p>
  <p><br/><br/></p>
  <p>Entre em contato com o comprador para finalizar a venda!</p>
  <p>Atenciosamente, Equipe Launchstore</p>
`

module.exports = {
  async index(req, res) {
    try {
      
      const orders = await LoadOrderService.load('orders', {
        where: { buyer_id: req.session.userId }
      })

      return res.render('orders/index', { orders })

    } catch (error) {
      console.error(error)
    }
  },
  async sales(req, res) {
    try {
      
      const sales = await LoadOrderService.load('orders', {
        where: { seller_id: req.session.userId }
      })

      return res.render('orders/sales', { sales })

    } catch (error) {
      console.error(error)
    }
  },
  async post(req, res) {
    try {

      // get cart products
      const cart = Cart.init(req.session.cart)

      // filter products, can't buy own products
      const buyer_id = req.session.userId

      const filteredItems = cart.items.filter(item => 
        item.product.user_id != buyer_id  
      )

      // create order
      const OrdersPromise = filteredItems.map(async item => { 
        let { product, price: total, quantity } = item 
        const { price, id: product_id, user_id: seller_id } = product
        const status = 'open'

        const order = await Order.create({
          seller_id,
          buyer_id,
          product_id,
          price,
          total,
          quantity,
          status
        })

        // get product
        product = await LoadProductService.load('product', { where: { id: product_id } })

        // get seller
        const seller = await User.find(seller_id)

        // get buyer
        const buyer = await User.find(buyer_id)

        // send email to seller
        await mailer.sendMail({
          to: seller.email,
          from: 'no-reply@launchstore.br',
          subject: 'Novo pedido de compra',
          html: email(seller, product, buyer)
        })

        return order
      })

      await Promise.all(OrdersPromise)

      // clean cart
      delete req.session.cart
      Cart.init()

      // warn user
      return res.render('orders/success')
      
    } catch (error) {
      console.error(error)
      return res.render('orders/error')
    }
  },
  async show(req, res) {
    try {

      const order = await LoadOrderService.load('order', {
        where: { id: req.params.id }
      })

      return res.render('orders/details', { order })
    } catch (error) {
      console.error(error)
    }
  },
  async update(req, res) {
    try {

      const { id, action } = req.params

      const acceptedActions = ['close', 'cancel']
      if (!acceptedActions.includes(action)) return res.send('Ação inválida')

      // get order
      const order = await Order.findOne({ where: { id } })
      if (!order) return res.send('Pedido não encontrado')

      // check order status
      if (order.status != 'open') return res.send('Ação inválida')

      // update status
      const statuses = {
        close: 'sold',
        cancel: 'canceled'
      }

      order.status = statuses[action]

      await Order.update(id, {
        status: order.status
      })

      return res.redirect('/orders/sales')
      
    } catch (error) {
      console.error(error)
    }
  }
}