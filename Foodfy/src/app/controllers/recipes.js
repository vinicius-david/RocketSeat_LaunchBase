const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')
const File = require('../models/File')
const User = require('../models/User')

module.exports = {
  async list(req, res) {

    // get recipes
    async function getRecipes() {

      //check if is admin
      const id = req.session.userId
      const user = await User.find({ where: {id} })

      if (user.is_admin) {

      // get all recipes
      let results = await Recipe.all()
      let recipes = results.rows
      return recipes

    } else {

      // get users recipes
      let results = await Recipe.userAll(id)
      let recipes = results.rows
      return recipes
    }
    }
    
    let recipes = await getRecipes()

    console.log(recipes)

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

    return res.render('admin/recipes/recipes', { recipes })

  },
  async create(req, res) {

    const results = await Chef.all()
    const chefs = results.rows

    return res.render('admin/recipes/create', { chefs })
  },
  async post(req, res) {

    if (req.files.length == 0) {
      return res.send('Envie ao menos uma imagem.')
    }

    req.body.user_id = req.session.userId

    let results = await Recipe.create(req.body)
    const recipeId = results.rows[0].id

    const filesPromise = req.files.map(file => File.create({...file, recipe_id: recipeId}))
    const filesIds = await Promise.all(filesPromise)

    for (let i = 0; i < filesIds.length; i++) {

      File.createRelation({
      recipe_id: recipeId,
      file_id: filesIds[i].rows[0].id
    })
    }
    
    return res.redirect(`/admin/recipes/${recipeId}`)

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

    return res.render('admin/recipes/show', { recipe, files })

  },
  async edit(req, res) {

    // get chefs

    let results = await Chef.all()
    const chefs = results.rows

    // get recipe

    results = await Recipe.find(req.params.id)
    const recipe = results.rows[0]

    if (!recipe) return res.send('Receita não encontrada')

    // get images

    results = await Recipe.files(recipe.id)
    let files = results.rows
    files = files.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))

    return res.render('admin/recipes/edit', { recipe, chefs, files })

  },
  async put(req, res) {

    if (req.files.length != 0) {
      const newFilesPromise = req.files.map(file => 
        File.create({...file, recipe_id: req.body.id}))

      const newFilesIds = await Promise.all(newFilesPromise)

      for (let i = 0; i < newFilesIds.length; i++) {

        File.createRelation({
        recipe_id: req.body.id,
        file_id: newFilesIds[i].rows[0].id
      })
      }
    }

    if (req.body.removed_files) {
      const removedFiles = req.body.removed_files.split(',')
      const lastIndex = removedFiles.length - 1
      removedFiles.splice(lastIndex, 1)

      const removedFilesPromise = removedFiles.map(id => File.delete(id))

      await Promise.all(removedFilesPromise)
    }

    await Recipe.update(req.body)
    
    return res.redirect(`/admin/recipes/${req.body.id}`)

  },
  async delete(req, res) {

    let results = await Recipe.find(req.body.id)
    const recipe = results.rows[0]

    results = await Recipe.files(recipe.id)
    const files = results.rows.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))

    for (let i = 0; i < files.length; i++) {
      await File.delete(files[i].id)
    }

    await Recipe.delete(req.body.id)

    return res.redirect('/admin/recipes')

  }
}