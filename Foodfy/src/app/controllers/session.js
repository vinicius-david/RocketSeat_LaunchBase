const crypto = require('crypto')
const mailer = require('../../lib/mailer')

const User = require('../models/User')

module.exports = {
  loginForm(req, res) {
    return res.render('session/login')
  },
  login(req, res) {
    return res.redirect('/admin/users')
  },
  logout(req, res) {

    req.session.destroy()

    return res.redirect('/')
  },
  forgotForm(req, res) {
    return res.render('session/forgot-password')
  },
  async forgot(req, res) {
    try {

      const email = req.body.email

      let results = await User.find({ where: {email} })
      const user = results
      
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

      // //warning
      // return res.render('session/forgot-password', {
      //   success: "Email enviado! Verifique sua caixa de entrada para redefinir a sua senha"
      // })

      return res.render('session/forgot-password')

    } catch (err) {
      console.log(err)
    }
  },
  resetForm(req, res) {
    return res.render('session/reset-password')
  },
  async reset(req, res) {

    const { email, token, password, repeatPassword } = req.body

    let user = await User.find({ where: {email} })

    await User.update(user.id, {
      password: password,
      reset_token: "",
      reset_token_expires: ""
    })

    return res.redirect('/users/login')
  }
}