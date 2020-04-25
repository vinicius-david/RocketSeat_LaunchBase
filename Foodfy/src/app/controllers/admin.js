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

    return res.render('admin/edit', { recipe })
  },
  put(req, res) {

    const { id } = req.body
    let index = 0

    const findRecipe = data.recipes.find(function(recipe, findIndex) {
      if (id == recipe.id) {
        index = findIndex
        return true
      }
    })

    console.log(req.body)
    
    if (!findRecipe) return res.send('Receita não encontrada.')

    recipe = {
      ...findRecipe,
      ...req.body,
      id: Number(req.body.id)
    }

    data.recipes[index] = recipe

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
      if(err) return res.send('Erro ao salvar.')

      return res.redirect(`/admin/recipes/${id}`)
  })

  },
  delete(req, res) {
    const { id } = req.body

    const recipeFilter = data.recipes.filter(function(recipe) {
      return recipe.id != id
    })
  
    data.recipes = recipeFilter
  
    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
      
      if (err) return res.send('Erro ao deletar.')
      return res.redirect('/admin/recipes')
    })
  }
}