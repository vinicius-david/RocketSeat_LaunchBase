const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')

const User = require('../models/User')

module.exports = {
  loginForm(req, res) {
    return res.render('session/login')
  },
  login(req, res) {

    req.session.userId = req.user.id

    return res.redirect('/users')

  },
  logout(req, res) {
    req.session.destroy()
    return res.redirect('/')
  },
  forgotForm(req, res) {
    return res.render('session/forgot-password')
  },
  async forgot(req, res) {

    const user = req.user

    try {

      // create user token
      const token = crypto.randomBytes(20).toString('hex')

      // create token expiration date
      let now = new Date()
      now = now.setHours(now.getHours() + 1)

      await User.update(user.id, {
        reset_token: token,
        reset_token_expires: now
      })

      //send email with token
      await mailer.sendMail({
        to: user.email,
        from: 'no-reply@launchstore.com.br',
        sub: 'Recuperação de senha',
        html: `
          <h2>Esqueceu a senha?</h2>
          <p>Clique no link abaixo para recuperar sua senha!</p>
          <p>
            <a href='http://localhost:3000/users/password-reset?token=${token}' target='_blank'>
            RECUPERAR SENHA
            </a>
          </p>
        `
      })

      //warning
      return res.render('session/forgot-password', {
        success: "Email enviado! Verifique sua caixa de entrada para redefinir a sua senha"
      })
      
    } catch (err) {
      console.error(err)
      return res.render('session/forgot-password', {
        error: "Erro inesperado"
      })
    }
  },
  resetForm(req, res) {
    return res.render('session/password-reset', { token: req.query.token })
  },
  async reset(req, res) {

    const user = req.user
    const { password, token } = req.body

    try {

      //hash password
      const newPassword = await hash(password, 8)

      //update user
      await User.update(user.id, {
        password: newPassword,
        reset_token: "",
        reset_token_expires: ""
      })

      return res.render('session/login', {
        user: req.body,
        success: 'Senha atualizada'
      })
      
    } catch (err) {
      console.error(err)
      return res.render('session/password-reset', {
        user: req.body,
        token,
        error: "Erro inesperado"
      })
    }

  }
}