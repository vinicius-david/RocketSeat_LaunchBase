const User = require('../models/User')
const { compare } = require('bcryptjs')

module.exports = {
  async login(req, res, next) {

    let { email, password } = req.body
    
    const user = await User.findOne({ where: {email} })

    if (!user) return res.render('session/login', {
      user: req.body,
      error: 'Usuário não cadastrado'
    })

    const passed = await compare(password, user.password)

    if (!passed) return res.render('session/login', {
      user: req.body,
      error: 'Senha incorreta'
    })

    req.user = user

    next()
  },
  async forgot(req, res, next) {

    const { email } = req.body
    try {

      let user = await User.findOne({ where: { email } })
      
      if (!user) return res.render('users/forgot-password', {
        user: req.body,
        error: 'Email não cadastrado'
      })

      req.user = user

      next()

    } catch (err) {
      console.error(err)      
    }
  },
  async reset(req, res, next) {
    
      let { email, password, passwordRepeat, token } = req.body

      // find user
      const user = await User.findOne({ where: {email} })

      if (!user) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Usuário não cadastrado'
      })

      //check passwords
      if (password != passwordRepeat) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Senhas diferentes'
      })
      
      //check tokens
      if (token =! user.reset_token) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Token inválido, solicite outra recuperação de senha'
      })
      
      //check token expiration
      let now = new Date()
      now = now.setHours(now.getHours())

      if (now > user.reset_token_expires) return res.render('session/password-reset', {
        user: req.body,
        token,
        error: 'Token expirado, solicite outra recuperação de senha'
      })

      req.user = user

      next()

  }
}