const fs = require('fs');
const data = require('../data.json');
const { calcularIdade, calcularData } = require('../util');

exports.lista = function(req,res) {

  return res.render('alunos/alunos', { alunos: data.alunos  })
}

exports.show = function(req,res) {

  const { id } = req.params

  const buscaaluno = data.alunos.find(function(aluno){
    return aluno.id == id
  })

  if (!buscaaluno) return res.send('aluno não encontrado.')

  const aluno = {
    ...buscaaluno,
    nascimento: calcularIdade(buscaaluno.nascimento),
    data_criacao: new Intl.DateTimeFormat("pt-BR").format(buscaaluno.data_criacao),
  }

  return res.render("alunos/show", { aluno })
}

exports.adicionar = function (req, res) {
  return res.render('alunos/adicionar')
}

exports.post =  function(req, res) {

  const keys = Object.keys(req.body)

  for(key of keys) {
    if (req.body[key] == '') {
      return res.send('Por favor, preencha todos os campos!')
    }
  }

  let { nome, avatar_url, nascimento, email, ano_escolar, carga_horaria } = req.body

  nascimento = Date.parse(nascimento)
  carga_horaria = Number(carga_horaria)
  const data_criacao = Date.now()

  let id = 1
  const lastAluno = data.alunos[data.alunos.length - 1]

  if (lastAluno) {
    id = lastAluno.id + 1
  }

  data.alunos.push({
    id,
    nome,
    avatar_url,
    nascimento,
    email,
    ano_escolar,
    carga_horaria,
    data_criacao
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

    if (err) return res.send('Erro ao salvar dados.')

    return res.redirect(`alunos/${ id }`)
  })

  // return res.send(req.body)
}

exports.edit = function(req, res) {

  let { id } = req.params

  const buscaaluno = data.alunos.find(function(aluno){
    return id == aluno.id
  })

  if (!buscaaluno) return res.send('aluno não encontrado.')

  const aluno = {
    ...buscaaluno,
    id: id,
    nascimento: calcularData(buscaaluno.nascimento).iso
  }

  return res.render('alunos/edit', { aluno })
}

exports.put = function(req, res) {

  const { id } = req.body
  let index = 0

  const buscaaluno = data.alunos.find(function(aluno, buscaIndex) {
    if (id == aluno.id) {
      index = buscaIndex
      return true
    }
  })
  
  if (!buscaaluno) return res.send('aluno não encontrado.')

  aluno = {
    ...buscaaluno,
    ...req.body,
    nascimento: Date.parse(req.body.nascimento),
    id: Number(req.body.id),
    carga_horaria: Number(req.body.carga_horaria)
  }

  data.alunos[index] = aluno

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Erro ao salvar.')

    return res.redirect(`alunos/${id}`)
  })

}

exports.delete = function(req, res) {

  const { id } = req.body

  const filtroalunos = data.alunos.filter(function(aluno) {
    return aluno.id != id
  })

  data.alunos = filtroalunos

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    
    if (err) return res.send('Erro ao deletar.')
    return res.redirect('/alunos')
  })
}
