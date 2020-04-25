const data = require('../../../data.json')
const fs = require('fs')

module.exports = {
  recipes(req, res) {

    return res.render('admin/recipes', { recipes: data.recipes })
  },
  create(req, res) {
    return res.render('admin/create')
  },
  post(req, res) {

    let { title, author, image_url, ingredients, preparation, information } = req.body

    let id = Number(data.recipes.length + 1)

    data.recipes.push({
      id,
      title,
      author,
      image_url,
      ingredients,
      preparation,
      information
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

      if (err) return res.send('Erro ao salvar dados.')

      return res.redirect(`/admin/recipes/${id}`)
    })

  },
  show(req, res) {

    const { id } = req.params

    const recipe = data.recipes[id - 1]

    if (!recipe) return res.send('Receita não encontrada.')

    return res.render('admin/show', { recipe })
  },
  edit(req, res) {

    let { id } = req.params

    const findRecipe = data.recipes.find(function(recipe) {
      return id == recipe.id
    })

    if (!findRecipe) return res.send('Receita não encontrada.')

    const recipe = {
      ...findRecipe
    }

    console.log(recipe)

    return res.render('admin/edit', { recipe })
  }
}