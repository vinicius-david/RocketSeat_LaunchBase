const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')

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
        <p>Sua senha atual é ${token}</p>
        <p>Clique no link abaixo para definit uma nova senha!</p>
        <p>
          <a href='http://localhost:3000/users/reset-password?token=${token}' target='_blank'>
          DEFINIR NOVA SENHA
          </a>
        </p>
      `
    })

    req.session.userId = userId
    
    return res.render(`admin/users/users`, {
      success: 'Novo usuário criado, use o link enviado por email para redefinir a sua senha'
    })
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

    if (req.body.password) return req.body.password = await hash(req.body.password, 8)    

    await User.update(userId, req.body)

    let results = await User.list()
    const users = results.rows

    return res.render(`admin/users/users`, {
      users,
      success: 'Os dados do usuário foram atualizados'
    })
  },
  async delete(req, res) {

    const id = req.body.id

    let results = await User.find({ where: {id} })
    const user = results

    if (user.total_recipes != 0) {

      let results = await User.list()
      const users = results.rows

      return res.render('admin/users/users', {
        users,
        error: 'Usuários com receitas cadastradas não podem ser deletados'
      })
    } else {
      
      await User.delete(req.body.id)

      let results = await User.list()
      const users = results.rows

      return res.render('admin/users/users', {
        users,
        success: 'Usuário deletado'
      })
    }
  }
}