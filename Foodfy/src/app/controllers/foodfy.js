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

    // get recipes

    let results = await Recipe.all()
    let recipes = results.rows

    // get images

    async function getImage(recipeId) {

      let results = await Recipe.files(recipeId)
      const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)

      return files[0]
    }

    const recipesPromisse = recipes.map(async recipe => {

      recipe.img = await getImage(recipe.id)

      return recipe
    })

    recipes = await Promise.all(recipesPromisse)

    return res.render('foodfy/recipes', { recipes })
  },
  async show(req, res) {

    let results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if (!recipe) return res.send('Receita não encontrada')

    results = await Recipe.files(recipe.id)
    const files = results.rows.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))

    return res.render('foodfy/show', { recipe, files })

  },
  async chefs(req, res) {

    let results = await Chef.all()
    let chefs = results.rows

    async function getImage(chefId) {

      let results = await Chef.file(chefId)
      const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)

      return files[0]
    }

    const chefsPromisse = chefs.map(async chef => {

      chef.img = await getImage(chef.id)

      return chef
    })

    chefs = await Promise.all(chefsPromisse)

    return res.render('foodfy/chefs', { chefs })
    
  },
  async filter(req, res) {

    const { filter } = req.query

    // Recipe.findBy(filter, function(recipes) {
    //   return res.render('foodfy/filter', { filter, recipes })
    // })

    // get recipes

    let results = await Recipe.findBy(filter)
    let recipes = results.rows

    // get images

    async function getImage(recipeId) {

      let results = await Recipe.files(recipeId)
      const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)

      return files[0]
    }

    const recipesPromisse = recipes.map(async recipe => {

      recipe.img = await getImage(recipe.id)

      return recipe
    })

    recipes = await Promise.all(recipesPromisse)

    return res.render('foodfy/recipes', { recipes })
  }
}