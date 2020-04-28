const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

module.exports = {
  async index(req, res) {

    const results = await Recipe.all()
    const recipes = results.rows

    return res.render('foodfy/index', { recipes })
  },
  about(req, res) {
    return res.render('foodfy/about')
  },
  async recipes(req, res) {

    const results = await Recipe.all()
    const recipes = results.rows

    return res.render('foodfy/recipes', { recipes })
  },
  async show(req, res) {

    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if (!recipe) return res.send('Receita não encontrada')

    return res.render('foodfy/show', { recipe })

  },
  chefs(req, res) {

    Chef.allTotal(function(chefs) {
      return res.render('foodfy/chefs', { chefs })
    })
  },
  filter(req, res) {

    const { filter } = req.query

    Recipe.findBy(filter, function(recipes) {
      return res.render('foodfy/filter', { filter, recipes })
    })
  }

}