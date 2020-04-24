const data = require('../../../data.json')

module.exports = {
  recipes(req, res) {
    
    return res.render('admin/recipes', { recipes: data.recipes })
  },
  show(req, res) {

    const { id } = req.params

    const recipe = data.recipes[id - 1]

    if (!recipe) return res.send('Receita não encontrada.')

    return res.render('admin/show', { recipe })
  }
}