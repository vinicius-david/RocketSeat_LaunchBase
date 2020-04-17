const Professor = require('../models/professor');
const { calcularIdade, calcularData } = require('../../lib/util');

module.exports = {
  lista(req, res){

    let { busca, page, limite } = req.query

    page = page || 1
    limite = limite || 2
    let offset = limite * ( page - 1 )

    const params = {
      busca,
      page,
      limite,
      offset,
      callback(professores){

        const pagination = {
          total: Math.ceil(professores[0].total / limite),
          page
        }

        return res.render('professores/professores', {professores, pagination, busca})
      }
    }

    Professor.pagination(params)
    
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

    Professor.create(req.body, function(professor) {
      return res.redirect(`professores/${professor.id}`)
    })
  
  },
  show(req, res){

      Professor.find(req.params.id, function(professor) {
        if (!professor) return res.send('Professor não encontrado.')

        professor.nascimento = calcularIdade(professor.nascimento)
        professor.materias = professor.materias.split(',')
        professor.data_criacao = calcularData(professor.data_criacao).format

        return res.render('professores/show', { professor })
      })
    return
  },
  edit(req, res){

      Professor.find(req.params.id, function(professor) {
        if (!professor) return res.send('Professor não encontrado.')

        professor.nascimento = calcularData(professor.nascimento).iso

        return res.render('professores/edit', { professor })
      })
    return
  },
  put(req, res){

    const keys = Object.keys(req.body)

    for(key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos!')
      }
    }
  
    Professor.update(req.body, function() {
      return res.redirect(`professores/${req.body.id}`)
    })
  },
  delete(req, res){

    Professor.delete(req.body.id, function() {
      return res.redirect('/professores')
    })
    return
  },
}
