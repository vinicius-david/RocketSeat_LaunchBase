const Aluno = require('../models/aluno');
const { calcularIdade, calcularData } = require('../../lib/util');

module.exports = {
  lista(req, res){

    let { busca, page, limite } = req.query

    page = page || 1
    limite = limite || 5
    let offset = limite * ( page - 1 )

    const params = {
      busca,
      page,
      limite,
      offset,
      callback(alunos){

        if (alunos[0]) {

          const pagination = {
          total: Math.ceil(alunos[0].total / limite),
          page
        }

        return res.render('alunos/alunos', {alunos, pagination, busca})
        } else {

          return res.render('alunos/naoEncontrado')
        }
      }
    }

    Aluno.pagination(params)
    
  },
  adicionar(req, res){

    Aluno.professorSelect(function(options){
      return res.render('alunos/adicionar', { professorOpcoes: options })
    })

  },
  post(req, res){

    const keys = Object.keys(req.body)

    for(key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos!')
      }
    }

    Aluno.create(req.body, function(aluno) {
      return res.redirect(`alunos/${aluno.id}`)
    })
  
  },
  show(req, res){

      Aluno.find(req.params.id, function(aluno) {
        if (!aluno) return res.render('alunos/naoEncontrado')

        aluno.nascimento = calcularIdade(aluno.nascimento)
        aluno.data_criacao = calcularData(aluno.data_criacao).format

        return res.render('alunos/show', { aluno })
      })
    return
  },
  edit(req, res){

      Aluno.find(req.params.id, function(aluno) {
        if (!aluno) return res.send('Aluno não encontrado.')

        aluno.nascimento = calcularData(aluno.nascimento).iso

        Aluno.professorSelect(function(options){
          return res.render('alunos/edit', { aluno, professorOpcoes: options })
        })

      })
  },
  put(req, res){

    const keys = Object.keys(req.body)

    for(key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos!')
      }
    }
  
    Aluno.update(req.body, function() {
      return res.redirect(`alunos/${req.body.id}`)
    })
  },
  delete(req, res){

    Aluno.delete(req.body.id, function() {
      return res.redirect('/alunos')
    })
    return
  },
}
