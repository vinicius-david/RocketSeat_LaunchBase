const { calcularIdade, calcularData } = require('../../lib/util');

module.exports = {
  lista(req, res){
    
    return res.render('alunos/alunos')
  },
  adicionar(req, res){

    return res.render('alunos/adicionar')
  },
  post(req, res){

    const keys = Object.keys(req.body)

    for(key of keys) {
      if (req.body[key] == '') {
        return res.send('Por favor, preencha todos os campos!')
      }
    }
  
    return
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
