const User = require('../models/User')

module.exports = {
  async post(req, res, next) {

    // check if has all fields
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send('Preencha todos os campos.')
      }
    }

    // check if user already exists (email, cpf_cnpj)
    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
    
    const user = await User.findOne({
      where: {email},
      or: {cpf_cnpj}
    })

    if (user) return res.send('Usuário já cadastrado.')

    // check if password match
    if (password != passwordRepeat) return res.send('Password mismatch.')

    next()
  }
}