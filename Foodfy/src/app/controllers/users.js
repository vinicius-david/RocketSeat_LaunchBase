const crypto = require('crypto')
const mailer = require('../../lib/mailer')

const User = require('../models/User')

module.exports = {
  async list(req, res) {

    let results = await User.list()
    const users = results.rows

    return res.render('admin/users/users', { users })
  },
  create(req, res) {
    return res.render('admin/users/create')
  },
  async post(req, res) {

    //create a random users password as token
    const token = crypto.randomBytes(20).toString('hex')
    req.body.password = token
    req.body.reset_token = token

    // create token expiration date
    let now = new Date()
    now = now.setHours(now.getHours() + 1)
    req.body.reset_token_expires = now

    //boolean admin status
    if (req.body.is_admin) {
      req.body.is_admin = true
    } else {
      req.body.is_admin = false
    }

    const userId = await User.create(req.body)

    //send email with token
    await mailer.sendMail({
      to: req.body.email,
      from: 'no-reply@launchstore.com.br',
      sub: 'Solicitação de registro de usuário',
      html: `
        <h2>Bem vindo ao Foodfy</h2>
        <p>Clique no link abaixo para definit uma nova senha!</p>
        <p>
          <a href='http://localhost:3000/users/reset-password?token=${token}' target='_blank'>
          RECUPERAR SENHA
          </a>
        </p>
      `
    })

    req.session.userId = userId
    
    return res.redirect(`/admin/users/${userId}`)
  },
  async show(req, res) {

    const id = req.params.id

    let results = await User.find({ where: {id} })
    const user = results

    return res.render('admin/users/show', { user })
  },
  async edit(req, res) {

    const id = req.params.id

    let results = await User.find({ where: {id} })
    const user = results

    return res.render('admin/users/edit', { user })
  },
  async put(req, res) {

    const userId = req.body.id

    //boolean admin status
    if (req.body.is_admin) {
      req.body.is_admin = true
    } else {
      req.body.is_admin = false
    }

    await User.update(userId, req.body)

    return res.redirect(`/admin/users/${userId}`)
  },
  async delete(req, res) {

    const id = req.params.id

    let results = await User.find({ where: {id} })
    const user = results

    if (user.total_recipes != 0) {
      return res.send('Usuários com receitas cadastradas não podem ser deletados.')
    } else {
      
      await User.delete(req.body.id)

      return res.redirect('/admin/users')
    }
  }
}