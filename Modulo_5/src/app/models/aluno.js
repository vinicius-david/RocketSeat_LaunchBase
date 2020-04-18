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
        data_criacao,
        professor_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `

    const values = [
      data.nome,
      data.avatar_url,
      calcularData(data.nascimento).iso,
      data.email,
      data.ano_escolar,
      data.carga_horaria,
      calcularData(Date.now()).iso,
      data.professor_id
    ]

    db.query(query, values, function(err, results) {
      if (err) throw `Database error. ${err}`

      callback(results.rows[0])
    })

  },
  find(id, callback) {
    db.query(`SELECT alunos.*, professores.nome AS professor_nome
      FROM alunos 
      LEFT JOIN professores ON (alunos.professor_id = professores.id)
      WHERE alunos.id = $1`, [id], function(err, results) {
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
      carga_horaria=($6),
      professor_id=($7)
    WHERE id = $8  
    `

    const values = [
      data.nome,
      data.avatar_url,
      calcularData(data.nascimento).iso,
      data.email,
      data.ano_escolar,
      data.carga_horaria,
      data.professor,
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
  },
  professorSelect(callback) {

    db.query(`SELECT nome, id FROM professores`, function(err, results) {
      if(err) throw `Database error. ${err}`

      callback(results.rows)
    })
  },
  pagination(params) {

    const { busca, limite, offset, callback } = params

    let query = "",
        buscaQuery = "",
        totalQuery = `(
        SELECT count(*) FROM alunos
        ) AS total`

    if (busca) {

      buscaQuery = `
      WHERE alunos.nome ILIKE '%${busca}%'
      OR alunos.email ILIKE '%${busca}%'`

      totalQuery = `(
      SELECT count(*) FROM alunos
      ${buscaQuery}
      ) as total`
    }

    query = `
    SELECT alunos.*, ${totalQuery}
    FROM alunos
    ${buscaQuery}
    ORDER BY alunos.nome
    LIMIT $1 OFFSET $2`

    db.query(query, [limite, offset], function(err, results){
      if (err) throw `Database error. ${err}`

      callback(results.rows)
    })

  }
}