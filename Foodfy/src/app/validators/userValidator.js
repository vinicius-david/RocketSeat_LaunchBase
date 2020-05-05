const User = require('../models/User')
const { compare } = require('bcryptjs')

function checkAllFields(body) {
  const keys = Object.keys(body)

  for (key of keys) {
    if (body[key] == "") {
      return {
        user: body,
        error: 'Preencha todos os campos'
      }
    }
  }
}

module.exports = {
  async put(req, res, next) {

    // check if has all fields
    const fillAllFields = checkAllFields(req.body)
    if (fillAllFields) {
      return res.render('admin/users/show', fillAllFields)
    }  
    
    const { id, password } = req.body

    if (!password) return res.render('admin/users/show', {
      error: 'Coloque sua senha para atualizar seu cadastro'
    })

    const user = await User.find({ where: {id} })
    const passed = await compare(password, user.password)

    if (!passed) return res.render('admin/users/show', {
      user,
      error: 'Senha incorreta'
    })

    req.user = user
    next()
  }
}