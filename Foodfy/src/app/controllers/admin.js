const data = require('../../../data.json')
const Admin = require('../models/Admin')
const fs = require('fs')

module.exports = {
  async recipes(req, res) {

    let results = await Admin.all()
    const recipes = results.rows

    return res.render('admin/recipes/recipes', { recipes })

  },
  create(req, res) {
    return res.render('admin/recipes/create')
  },
  post(req, res) {

    Admin.create(req.body, function(recipe) {
      return res.redirect(`/admin/recipes/${recipe.id}`)
    })

  },
  show(req, res) {

    Admin.find(req.params.id, function(recipe) {
      if (!recipe) return res.send('Receita não encontrada')

      return res.render('admin/recipes/show', { recipe })
    })

    return
  },
  edit(req, res) {

    Admin.find(req.params.id, function(recipe) {
      if (!recipe) return res.send('Receita não encontrada')

      return res.render('admin/recipes/edit', { recipe })
    })

    return
  },
  put(req, res) {
  
    Admin.update(req.body, function() {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })

  },
  delete(req, res) {

    Admin.delete(req.body.id, function() {
      return res.redirect('/admin/recipes')
    })
    return
  }
}