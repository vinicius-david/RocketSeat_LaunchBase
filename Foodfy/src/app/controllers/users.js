const crypto = require('crypto')

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

    //create users password
    const password = crypto.randomBytes(10).toString('hex')
    req.body.password = password

    //boolean admin status
    if (req.body.is_admin) {
      req.body.is_admin = true
    } else {
      req.body.is_admin = false
    }

    const userId = await User.create(req.body)

    req.session.userId = userId
    
    return res.redirect(`/admin/users/${userId}`)
  },
  async show(req, res) {

    const id = req.params.id
    console.log(id)
    let results = await User.find({ where: {id} })
    console.log(results)
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

    await User.update(req.body)

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