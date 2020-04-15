const { calcularData } = require('../../lib/util');
const db = require('../../config/db');

module.exports = {
  all(callback) {

    db.query('SELECT * FROM professores', function(err, results) {

      if (err) throw `Database error. ${err}`
      
      callback(results.rows)
    })


  },
  create(data, callback) {

    const query = `
      INSERT INTO professores (
        nome,
        avatar_url,
        nascimento,
        escolaridade,
        aula,
        materias,
        data_criacao
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.nome,
      data.avatar_url,
      calcularData(data.nascimento).iso,
      data.escolaridade,
      data.aula,
      data.materias,
      calcularData(Date.now()).iso
    ]

    db.query(query, values, function(err, results) {
      if (err) throw `Database error. ${err}`

      callback(results.rows[0])
    })

  },
  find(id, callback) {
    db.query(`SELECT * 
      FROM professores 
      WHERE id = $1`, [id], function(err, results) {
        if (err) throw `Database error. ${err}`

        callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
    UPDATE professores SET 
      nome=($1), 
      avatar_url=($2), 
      nascimento=($3), 
      escolaridade=($4), 
      aula=($5), 
      materias=($6)
    WHERE id = $7  
    `

    const values = [
      data.nome,
      data.avatar_url,
      calcularData(data.nascimento).iso,
      data.escolaridade,
      data.aula,
      data.materias,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if (err) throw `Database error. ${err}`

      callback()
    })
  },
  delete(id, callback) {
    
    db.query(`DELETE FROM professores WHERE id = $1`, [id], function(err, results) {
      if (err) return `Database error. ${err}`

      return callback() 
    })
  }
}