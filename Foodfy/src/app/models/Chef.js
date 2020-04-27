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
  create(data, callback) {

    const query = `
      INSERT INTO chefs (
        name,
        avatar_url
      ) VALUES ($1, $2)
      RETURNING id
    `

    const values = [
      data.name,
      data.avatar_url
    ]

    db.query(query, values, function(err, results) {
      if (err) throw `Database error. ${err}`

      callback(results.rows[0])
    })
  },
  find(id, callback) {

    db.query(`SELECT chefs.*, count(recipes) AS total_recipes 
    FROM chefs
    LEFT JOIN recipes ON (recipes.chef_id = chefs.id)
    GROUP by chefs.id ORDER by chefs.id`, function(err, results) {
      if (err) throw `Database error. ${err}`

      callback(results.rows[id-1])
    })

  },
  update(data, callback) {
    const query = `
    UPDATE chefs SET 
      name=($1), 
      avatar_url=($2)
    WHERE id = $3 
    `

    const values = [
      data.name,
      data.avatar_url,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if (err) throw `Database error. ${err}`

      callback()
    })
  },
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
      if (err) return `Database error. ${err}`

      return callback() 
    })
  }
}