const data = require('../../../data.json')

module.exports = {
  listMain(req, res) {
    return res.render('foodfy', { recipes: data.recipes })
  },
  listAll(req, res) {
    return res.render('recipes', { recipes: data.recipes })
  },
  show(req, res) {
  const { id } = req.params

  const recipe = data.recipes[id - 1]

  if (!recipe) return res.send('Receita não encontrada.')

  return res.render('show.njk', { recipe })
  }
}