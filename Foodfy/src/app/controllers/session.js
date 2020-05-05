const crypto = require('crypto')
const mailer = require('../../lib/mailer')
const { hash } = require('bcryptjs')

const User = require('../models/User')

module.exports = {
  loginForm(req, res) {

    if (req.session.userId) return res.redirect('/admin/users')

    return res.render('session/login')
  },
  async login(req, res) {

    req.session.userId = req.user.id

    return res.redirect(`/admin/users/${req.session.userId}`)
  },
  logout(req, res) {

    req.session.destroy()

    return res.redirect('/users/login')
  },
  forgotForm(req, res) {
    return res.render('session/forgot-password')
  },
  async forgot(req, res) {
    try {

      const user = req.user

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
            <a href='http://localhost:3000/users/reset-password?token=${token}' target='_blank'>
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
      console.log(err)
    }
  },
  resetForm(req, res) {
    return res.render('session/reset-password', { token: req.query.token })
  },
  async reset(req, res) {

    const { password } = req.body
    const user = req.user

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
  }
}