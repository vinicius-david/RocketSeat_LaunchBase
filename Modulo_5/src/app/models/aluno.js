const { calcularData } = require('../../lib/util');
const db = require('../../config/db');

module.exports = {
  all(callback) {

    db.query('SELECT * FROM alunos', function(err, results) {

      if (err) throw `Database error. ${err}`
      
      callback(results.rows)
    })


  },
  create(data, callback) {

    const query = `
      INSERT INTO alunos (
        nome,
        avatar_url,
        nascimento,
        email,
        ano_escolar,
        carga_horaria,
        data_criacao
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `

    const values = [
      data.nome,
      data.avatar_url,
      calcularData(data.nascimento).iso,
      data.email,
      data.ano_escolar,
      data.carga_horaria,
      calcularData(Date.now()).iso
    ]

    db.query(query, values, function(err, results) {
      if (err) throw `Database error. ${err}`

      callback(results.rows[0])
    })

  },
  find(id, callback) {
    db.query(`SELECT * 
      FROM alunos 
      WHERE id = $1`, [id], function(err, results) {
        if (err) throw `Database error. ${err}`

        callback(results.rows[0])
    })
  },
  update(data, callback) {
    const query = `
    UPDATE alunos SET 
      nome=($1), 
      avatar_url=($2), 
      nascimento=($3), 
      email=($4), 
      ano_escolar=($5), 
      carga_horaria=($6)
    WHERE id = $7  
    `

    const values = [
      data.nome,
      data.avatar_url,
      calcularData(data.nascimento).iso,
      data.email,
      data.ano_escolar,
      data.carga_horaria,
      data.id
    ]

    db.query(query, values, function(err, results) {
      if (err) throw `Database error. ${err}`

      callback()
    })
  },
  delete(id, callback) {
    
    db.query(`DELETE FROM alunos WHERE id = $1`, [id], function(err, results) {
      if (err) return `Database error. ${err}`

      return callback() 
    })
  }
}