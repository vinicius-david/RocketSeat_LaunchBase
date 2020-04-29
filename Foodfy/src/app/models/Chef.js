const db = require('../../config/db')

module.exports = {
  all() {

    return db.query(`SELECT * FROM chefs`)

  },
  allTotal(callback) {
    db.query(`SELECT chefs.*, count(recipes) AS total_recipes 
    FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    GROUP by chefs.id ORDER by chefs.id`, function(err, results) {
      if (err) throw `Database error. ${err}`

      callback(results.rows)
    })
  },
  create(data) {

    const query = `
      INSERT INTO chefs (
        name,
        file_id
      ) VALUES ($1, $2)
      RETURNING id
    `

    const values = [
      data.name,
      data.file_id
    ]

    return db.query(query, values)

  },
  find(id) {

    const query = `SELECT chefs.*, count(recipes) AS total_recipes 
    FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
     WHERE chefs.id = $1 GROUP by chefs.id`
     
    const values = [
      id
    ]

    return db.query(query, values)

  },
  update(data) {

    const query = `
    UPDATE chefs SET 
      name=($1), 
      file_id=($2)
    WHERE id = $3 
    `

    const values = [
      data.name,
      data.file_id,
      data.id
    ]

    return db.query(query, values)
  },
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
      if (err) return `Database error. ${err}`

      return callback() 
    })
  },
  file(id) {

    const query = `SELECT files.*, chefs.id, file_id
    FROM files
    LEFT JOIN chefs ON (files.id = chefs.file_id)
    WHERE chefs.id = $1`

    const values = [
      id
    ]

    return db.query(query, values)
  },
  allFiles() {

    const query = `SELECT files.*, chefs.id, file_id
    FROM files
    LEFT JOIN chefs ON (files.id = chefs.file_id)`

    return db.query(query)
  }
}