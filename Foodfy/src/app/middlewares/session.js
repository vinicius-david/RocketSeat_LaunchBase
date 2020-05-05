const User = require('../models/User')

module.exports = {
  onlyUsers(req, res, next) {

    if (!req.session.userId) return res.redirect('/users/login')

    next()
  },
  isLoggedRedirectToUser(req, res, next) {

    if (req.session.userId) return res.redirect(`/admin/users/${req.session.userId}`)

    next()
  },
  async onlyAdmins(req, res, next) {

    const id = req.session.userId

    const user = await User.find({ where: {id} })

    if (!user.is_admin) return res.send('Only admins')

    next()
  },
  isYourAccount(req, res, next) {

    if (req.params.id == req.session.userId) return res.send('Não pode deletar a própria conta')

    next()
  }
}