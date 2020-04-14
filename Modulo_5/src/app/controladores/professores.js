const { calcularIdade, calcularData } = require('../../lib/util');
const db = require('../../config/db');

module.exports = {
  lista(req, res){
    
    db.query('SELECT * FROM professores', function(err, results) {

      if (err) return res.send('Database error.')
      
      return res.render('professores/professores', {professores: results.rows})
    })

    
  },
  adicionar(req, res){

    return res.render('professores/adicionar')
  },
  post(req, res){

    const keys = Object.keys(req.body)

    for(key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos!')
      }
    }

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
      req.body.nome,
      req.body.avatar_url,
      calcularData(req.body.nascimento).iso,
      req.body.escolaridade,
      req.body.aula,
      req.body.materias,
      calcularData(Date.now()).iso
    ]

    db.query(query, values, function(err, results) {
      if (err) return res.send('Database error.')

      return res.redirect(`/professores/${results.rows[0].id}`)
    })
  
  },
  show(req, res){

    return
  },
  edit(req, res){

    return
  },
  put(req, res){

    const keys = Object.keys(req.body)

    for(key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos!')
      }
    }
  
    return
  },
  delete(req, res){

    return
  },
}
