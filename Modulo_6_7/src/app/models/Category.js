const db = require('../../config/db')

module.exports = {
  all() {

    const query = `SELECT * FROM categories`
    
    return db.query(query)
  }
}