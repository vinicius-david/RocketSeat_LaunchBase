const Chef = require('../models/Chef')
const Recipe = require('../models/Recipe')

module.exports = {
  async list(req, res) {

    let results = await Chef.all()
    const chefs = results.rows

    return res.render('admin/chefs/chefs', { chefs })

  },
  create(req, res) {
    return res.render('admin/chefs/create')
  },
  post(req, res) {

    Chef.create(req.body, function(chef) {
      return res.redirect(`/admin/chefs/${chef.id}`)
    })

  },
  show(req, res) {

    // Chef.find(req.params.id, function(chef) {

    //   if (!chef) return res.send('Chef não encontrado.')

    //     return res.render('admin/chefs/show', { chef })

    // })

    Chef.find(req.params.id, function(chef) {
      if (!chef) return res.send('Chef não encontrado.')
      Recipe.findAllChefsRecipes(req.params.id, function(recipes) {
        
        return res.render('admin/chefs/show', { chef, recipes })
      })
      return
    })

    return 

  },
  edit(req, res) {

    Chef.find(req.params.id, function(chef) {
      if (!chef) return res.send('Chef não encontrado')

      return res.render('admin/chefs/edit', { chef })
    })

    return
  },
  put(req, res) {
  
    Chef.update(req.body, function() {
      return res.redirect(`/admin/chefs/${req.body.id}`)
    })

  },
  delete(req, res) {

    Chef.delete(req.body.id, function() {
      return res.redirect('/admin/chefs')
    })
    return
  }
}