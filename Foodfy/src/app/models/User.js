const db = require('../../config/db')

const { hash } = require('bcryptjs')

module.exports = {
  list() {
    try {

      const query = `SELECT * FROM users`

      return db.query(query)
      
    } catch (err) {
      console.error(err)
    }
  },
  async create(data) {
    try {

    const query = `
      INSERT INTO users (
        name,
        email,
        password,
        is_admin
      ) VALUES ($1, $2, $3, $4)
      RETURNING id
    `

    const passwordHash = await hash(data.password, 8)

    const values = [
      data.name,
      data.email,
      data.password,
      data.is_admin
    ]

    const results = await db.query(query, values)

    return results.rows[0].id

    } catch (err) {
      console.error(err)
    }
  },
  async find(filters) {
    try {

      // const query = `SELECT users.*, count(recipes) AS total_recipes 
      // FROM users
      // LEFT JOIN recipes ON (recipes.user_id = users.id)
      // WHERE users.id = $1 GROUP by users.id`

      // const values = [
      //   id
      // ]

      // return db.query(query, values)

      let query = `SELECT users.*, count(recipes) AS total_recipes
        FROM users
        LEFT JOIN recipes ON (recipes.user_id = users.id)
      `

      Object.keys(filters).map(key => {
        // WHERE, OR, AND
        query = `${query}
          ${key}
        `
        Object.keys(filters[key]).map(field => {
          query = `${query} users.${field} = '${filters[key][field]}' GROUP BY users.id`
        })
      })
  
      const results = await db.query(query)
      
      return results.rows[0]

    } catch (err) {
      console.error(err)
    }
  },
  async update(id, fields) {
    try {
      
      let query = `UPDATE users SET`

      Object.keys(fields).map((key, index, array) => {
        if((index + 1) < array.length) {
          query = `${query}
            ${key} = '${fields[key]}',
          `
        } else {
          // last iteration
          query = `${query}
            ${key} = '${fields[key]}'
            WHERE id = ${id}
          `
        }
      })
  
      await db.query(query)
      return

    } catch (err) {
      console.error(err)
    }
  },
  delete(id) {
    try {
      
    const query = `DELETE FROM users WHERE id = $1`
    
    const values = [
      id
    ]

    return db.query(query, values)

    } catch (err) {
      console.error(err)
    }
  }
}