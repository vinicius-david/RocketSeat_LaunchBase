const Aluno = require('../models/aluno');
const { calcularIdade, calcularData } = require('../../lib/util');

module.exports = {
  lista(req, res){
    
    Aluno.all(function(alunos) {
      return res.render('alunos/alunos', {alunos})
    })
    
    
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
        if (!aluno) return res.send('Aluno não encontrado.')

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
