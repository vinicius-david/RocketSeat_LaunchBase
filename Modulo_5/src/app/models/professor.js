const { calcularData } = require('../../lib/util');
const db = require('../../config/db');

module.exports = {
  all(callback) {

    db.query(`
      SELECT professores.*, count(alunos) AS total_alunos 
      FROM professores
      LEFT JOIN alunos ON (alunos.professor_id = professores.id)
      GROUP by professores.id`, 
      
      function(err, results) {

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
  findBy(busca, callback) {

    db.query(`
      SELECT professores.*, count(alunos) AS total_alunos 
      FROM professores
      LEFT JOIN alunos ON (alunos.professor_id = professores.id)
      WHERE professores.nome ILIKE '%${busca}%'
      OR professores.materias ILIKE '%${busca}%'
      GROUP by professores.id`, 
      
      function(err, results) {

        if (err) throw `Database error. ${err}`
      
      callback(results.rows)
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
  },
  pagination(params) {

    const { busca, limite, offset, callback } = params

    let query = "",
        buscaQuery = "",
        totalQuery = `(
        SELECT count(*) FROM professores
        ) AS total`

    if (busca) {

      buscaQuery = `
      WHERE professores.nome ILIKE '%${busca}%'
      OR professores.materias ILIKE '%${busca}%'`

      totalQuery = `(
      SELECT count(*) FROM professores
      ${buscaQuery}
      ) as total`
    }

    query = `
    SELECT professores.*, ${totalQuery}, count(alunos) AS total_alunos 
    FROM professores
    LEFT JOIN alunos ON (professores.id = alunos.professor_id)
    ${buscaQuery}
    GROUP BY professores.id 
    ORDER BY professores.nome
    LIMIT $1 OFFSET $2`

    db.query(query, [limite, offset], function(err, results){
      if (err) throw `Database error. ${err}`

      callback(results.rows)
    })

  }
}