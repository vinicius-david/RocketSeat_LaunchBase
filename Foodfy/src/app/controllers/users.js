module.exports = {
  list(req, res) {
    return res.render('admin/users/users')
  },
  create(req, res) {
    return res.render('admin/users/create')
  },
  show(req, res) {
    return res.render('admin/users/show')
  },
  edit(req, res) {
    return res.render('admin/users/edit')
  }
}