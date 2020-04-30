const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')
const File = require('../models/File')

module.exports = {
  async list(req, res) {

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

    return res.render('admin/chefs/chefs', { chefs })

  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  async post(req, res) {

    const file = req.files

    const filesPromise = file.map(file => File.create({
      name: file.filename,
      path: `/images/${file.filename}`
    }))
    let fileId = await Promise.all(filesPromise)
    
    let values = {
      name: req.body.name,
      file_id: fileId[0].rows[0].id
    }

    let results = await Chef.create(values)
    const chefId = results.rows[0].id
    
    return res.redirect(`/admin/chefs/${chefId}`)

  },
  async show(req, res) {

    // get chef

    let results = await Chef.find(req.params.id)
    let chef = results.rows

    if (!chef) return res.send('Chef não encontrado.')

    // get chef avatar

    async function getChefImage(chefId) {

      let results = await Chef.file(chefId)
      const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)

      return files
    }

    const chefsPromise = chef.map(async chef => {

      chef.img = await getChefImage(chef.id)

      return chef
    })
    
    chef = await Promise.all(chefsPromise)
    chef = chef[0]

    // get recipes

    results = await Recipe.findAllChefsRecipes(chef.id)
    let recipes = results.rows

    // get recipes images

    async function getImage(recipeId) {

      let results = await Recipe.files(recipeId)
      const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)

      return files[0]
    }

    const recipesPromise = recipes.map(async recipe => {

      recipe.img = await getImage(recipe.id)

      return recipe
    })
    
    recipes = await Promise.all(recipesPromise)
            
    return res.render('admin/chefs/show', { chef, recipes })

  },
  async edit(req, res) {

    let results = await Chef.find(req.params.id)
    const chef = results.rows[0]

    if (!chef) return res.send('Chef não encontrado.')

    return res.render('admin/chefs/edit', { chef })
    
  },
  async put(req, res) {
    
    if (req.files.length != 0) {

      // get chef

      let results = await Chef.find(req.body.id)
      const chef = results.rows[0]

      // get chef avatar

      results = await Chef.file(chef.id)
      const file = results.rows.map(file => ({
        ...file,
        src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
      }))
  
      const newFilesPromise = req.files.map(file => File.create({
        name: file.filename,
        path: `/images/${file.filename}`
      }))
      
      let fileId = await Promise.all(newFilesPromise)
      
      let values = {
        name: req.body.name,
        file_id: fileId[0].rows[0].id,
        id: req.body.id
      }
      
      await Chef.update(values)
      
      await File.deleteChefFile(file[0].file_id)
      
    }
    
    return res.redirect(`/admin/chefs/${req.body.id}`)
  },
  async delete(req, res) {

    // get chef

    let results = await Chef.find(req.body.id)
    const chef = results.rows[0]

    // get chef avatar

    results = await Chef.file(chef.id)
    const file = results.rows.map(file => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
    }))
      
    if (chef.total_recipes == 0) {
        
      await Chef.delete(req.body.id)

      await File.deleteChefFile(file[0].file_id)
        
      return res.redirect('/admin/chefs')
      
    } else {

      return res.send('O chef não pode ser deletado pois possui receitas cadastradas.')
    }
    
  }
}