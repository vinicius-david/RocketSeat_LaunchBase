const LoadProductService = require('../services/LoadProductService')

module.exports = {
  async index(req, res) {
    try {

      const products = await LoadProductService.load('products')
      const lastAdded = products
      .filter((product, index) => index > 2 ? false : true)
  
      return res.render('home/index', { products: lastAdded })
      
    } catch (err) {
      console.error(err)
    }
  }
}