const fs = require('fs');
const data = require('./data.json');

exports.show = function(req,res) {

  const { id } = req.params

  const buscaProfessor = data.professores.find(function(professor){
    return professor.id == id
  })

  if (!buscaProfessor) return res.send('Professor não encontrado.')

  const professor = {
    ...buscaProfessor,
    idade: "",
    escolaridade: "",
    aula: buscaProfessor.aula,
    materias: buscaProfessor.materias.split(','),
    data_criacao: "",
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

    return res.redirect('/professores')
  })

  // return res.send(req.body)
}
