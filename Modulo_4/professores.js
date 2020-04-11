const fs = require('fs');
const data = require('./data.json');
const { calcularIdade, calcularData } = require('./util');

exports.show = function(req,res) {

  const { id } = req.params

  const buscaProfessor = data.professores.find(function(professor){
    return professor.id == id
  })

  if (!buscaProfessor) return res.send('Professor não encontrado.')

  const professor = {
    ...buscaProfessor,
    nascimento: calcularIdade(buscaProfessor.nascimento),
    escolaridade: "",
    aula: buscaProfessor.aula,
    materias: buscaProfessor.materias.split(','),
    data_criacao: new Intl.DateTimeFormat("pt-BR").format(buscaProfessor.data_criacao),
  }

  return res.render("show", { professor })
}

exports.post =  function(req, res) {

  const keys = Object.keys(req.body)

  for(key of keys) {
    if (req.body[key] == '') {
      return res.send('Por favor, preencha todos os campos!')
    }
  }

  let { nome, avatar_url, nascimento, escolaridade, aula, materias } = req.body

  nascimento = Date.parse(nascimento)
  const data_criacao = Date.now()
  const id = Number(data.professores.length + 1)

  data.professores.push({
    id,
    nome,
    avatar_url,
    nascimento,
    escolaridade,
    aula,
    materias,
    data_criacao
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){

    if (err) return res.send('Erro ao salvar dados.')

    return res.redirect(`/professores/${ id }`)
  })

  // return res.send(req.body)
}

exports.edit = function(req, res) {

  const { id } = req.params

  const buscaProfessor = data.professores.find(function(professor){
    return id == professor.id
  })

  if (!buscaProfessor) return res.send('Professor não encontrado.')

  const professor = {
    ...buscaProfessor,
    nascimento: calcularData(buscaProfessor.nascimento)
  }

  return res.render('edit', { professor })
}

exports.put = function(req, res) {

  const { id } = req.body
  let index = 0

  const buscaProfessor = data.professores.find(function(professor, buscaIndex) {
    if (id == professor.id) {
      index = buscaIndex
      return true
    }
  })
  
  if (!buscaProfessor) return res.send('Professor não encontrado.')

  professor = {
    ...buscaProfessor,
    ...req.body,
    nascimento: Date.parse(req.body.nascimento)
  }

  data.professores[index] = professor

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send('Erro ao salvar.')

    return res.redirect(`/professores/${id}`)
  })

}

