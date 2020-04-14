<<<<<<< HEAD
module.exports = {
  calcularIdade: function(timestamp) {

    const hoje = new Date()
    const nascimento = new Date(timestamp)
  
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mes = hoje.getMonth() - nascimento.getMonth()
  
    if (mes < 0 || (mes == 0 && hoje.getDate() <= nascimento.getDate()) ) {
      idade = idade -1
    }
  
    return idade
  },

  calcularData: function(timestamp){

    const data = new Date(timestamp)

    const ano = data.getUTCFullYear()
    const mes = `0${data.getUTCMonth() + 1}`.slice(-2)
    const dia = `0${data.getUTCDate()}`.slice(-2)

    return {
      dia,
      mes,
      ano,
      iso: `${ano}-${mes}-${dia}`,
      diaNascimento: `${dia}/${mes}`
    }

  }
=======
module.exports = {
  calcularIdade: function(timestamp) {

    const hoje = new Date()
    const nascimento = new Date(timestamp)
  
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mes = hoje.getMonth() - nascimento.getMonth()
  
    if (mes < 0 || (mes == 0 && hoje.getDate() <= nascimento.getDate()) ) {
      idade = idade -1
    }
  
    return idade
  },

  calcularData: function(timestamp){

    const data = new Date(timestamp)

    const ano = data.getUTCFullYear()
    const mes = `0${data.getUTCMonth() + 1}`.slice(-2)
    const dia = `0${data.getUTCDate()}`.slice(-2)

    return {
      dia,
      mes,
      ano,
      iso: `${ano}-${mes}-${dia}`,
      diaNascimento: `${dia}/${mes}`
    }

  }
>>>>>>> 82876af058933e7ca96427a1734539b283aee1f8
}