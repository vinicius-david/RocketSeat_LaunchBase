module.exports = {
  calcularIdade(timestamp) {

    const hoje = new Date()
    const nascimento = new Date(timestamp)
  
    let idade = hoje.getFullYear() - nascimento.getFullYear()
    const mes = hoje.getMonth() - nascimento.getMonth()
  
    if (mes < 0 || (mes == 0 && hoje.getDate() <= nascimento.getDate()) ) {
      idade = idade -1
    }
  
    return idade
  },

  calcularData(timestamp){

    const data = new Date(timestamp)

    const ano = data.getUTCFullYear()
    const mes = `0${data.getUTCMonth() + 1}`.slice(-2)
    const dia = `0${data.getUTCDate()}`.slice(-2)

    return {
      dia,
      mes,
      ano,
      iso: `${ano}-${mes}-${dia}`,
      diaNascimento: `${dia}/${mes}`,
      format: `${dia}-${mes}-${ano}`
    }

  },
  formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price/100)
  }
}