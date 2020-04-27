const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
  async list(req, res) {

    let results = await Recipe.all()
    const recipes = results.rows

    return res.render('admin/recipes/recipes', { recipes })

  },
  async create(req, res) {

    const results = await Chef.all()
    const chefs = results.rows

    return res.render('admin/recipes/create', { chefs })
  },
  post(req, res) {

    Recipe.create(req.body, function(recipe) {
      return res.redirect(`/admin/recipes/${recipe.id}`)
    })

  },
  show(req, res) {

    Recipe.find(req.params.id, function(recipe) {
      if (!recipe) return res.send('Receita não encontrada')

      return res.render('admin/recipes/show', { recipe })
    })

    return
  },
  async edit(req, res) {

    const results = await Chef.all()
    const chefs = results.rows

    Recipe.find(req.params.id, function(recipe) {
      if (!recipe) return res.send('Receita não encontrada')

      return res.render('admin/recipes/edit', { recipe, chefs })
    })

    return
  },
  put(req, res) {
  
    Recipe.update(req.body, function() {
      return res.redirect(`/admin/recipes/${req.body.id}`)
    })

  },
  delete(req, res) {

    Recipe.delete(req.body.id, function() {
      return res.redirect('/admin/recipes')
    })
    return
  }
}