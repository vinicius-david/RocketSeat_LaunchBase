const LoadProductService = require('../services/LoadProductService')
const User = require('../models/User')

const mailer = require('../../lib/mailer')


const email = (seller, product, buyer) => `
  <h2>Olá ${seller.name}</h2>
  <p>Você tem um novo pedido de compra do seu produto!</p>
  <p>Produto: ${product.name}</p>
  <p>Produto: ${product.formattedPrice}</p>
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
  async post(req, res) {
    try {

      // get product
      const product = await LoadProductService.load('product', { where: { id: req.body.id } })

      // get seller
      const seller = await User.find(product.user_id)

      // get buyer
      const buyer = await User.find(req.session.userId)

      // send email to seller
      await mailer.sendMail({
        to: seller.email,
        from: 'no-reply@launchstore.br',
        subject: 'Novo pedido de compra',
        html: email(seller, product, buyer)
      })

      // warn user
      return res.render('orders/success')
      
    } catch (error) {
      console.error(error)
      return res.render('orders/error')
    }
  }
}