const db = require('../../config/db')

const { hash } = require('bcryptjs')

module.exports = {
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
      passwordHash,
      data.is_admin
    ]

    const results = await db.query(query, values)

    return results.rows[0].id

    } catch (err) {
      console.error(err)
    }
  },
  find(id) {
    try {

      const query = `SELECT users.*, count(recipes) AS total_recipes 
      FROM users
      LEFT JOIN recipes ON (recipes.user_id = users.id)
      WHERE users.id = $1 GROUP by users.id`

      const values = [
        id
      ]

      return db.query(query, values)

    } catch (err) {
      console.error(err)
    }
  },
  update(data) {
    try {
      
    const query = `
    UPDATE users SET 
      name=($1), 
      email=($2),
      is_admin=($3)
      WHERE id = $4 
    `

    const values = [
      data.name,
      data.email,
      data.is_admin,
      data.id
    ]

    return db.query(query, values)

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