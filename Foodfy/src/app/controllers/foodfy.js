const data = require('../../../data.json')

module.exports = {
  index(req, res) {
    return res.render('foodfy/index', { recipes: data.recipes })
  },
  about(req, res) {
    return res.render('foodfy/about')
  },
  recipes(req, res) {
    return res.render('foodfy/recipes', { recipes: data.recipes })
  },
  show(req, res) {
  const { id } = req.params

  const recipe = data.recipes[id - 1]

  if (!recipe) return res.send('Receita não encontrada.')

  return res.render('foodfy/show', { recipe })
  }
}