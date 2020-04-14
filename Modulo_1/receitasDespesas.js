<<<<<<< HEAD
const usuarios = [
  {
    nome: 'Salvio',
    receitas: [115.3, 48.7, 98.3, 14.5],
    despesas: [85.3, 13.5, 19.9]
  },
  {
    nome: 'Marcio',
    receitas: [24.6, 214.3, 45.3],
    despesas: [185.3, 12.1, 120.0]
  },
  {
    nome: 'Lucia',
    receitas: [9.8, 120.3, 340.2, 45.3],
    despesas: [450.2, 29.9]
  }
];

function calculoSaldo() {

  for ( let i = 0; i < usuarios.length; i++ ) {

    let receita = somaNumeros(usuarios[i].receitas) - somaNumeros(usuarios[i].despesas) // cálculo das receitas
    receita = receita.toFixed(2); // limita o valor a 2 casas decimais

    if ( receita > 0 ) {
      console.log(`${usuarios[i].nome} possui saldo POSITIVO de ${receita}!`)
    } else {
      console.log(`${usuarios[i].nome} possui saldo NEGATIVO de ${receita}!`)
    } // imprime uma mensagem com o resultado
  }
  return
}
// função que calcula a receita de todos os usuários em um vetor

function somaNumeros(numeros) {
  let soma = 0;
  for ( let i = 0; i < numeros.length; i++ ) {
    soma = soma + numeros[i];
  }
  return soma;
}
// função que calcula o somatórios dos valores dentro de um vetor

calculoSaldo();
=======
const usuarios = [
  {
    nome: 'Salvio',
    receitas: [115.3, 48.7, 98.3, 14.5],
    despesas: [85.3, 13.5, 19.9]
  },
  {
    nome: 'Marcio',
    receitas: [24.6, 214.3, 45.3],
    despesas: [185.3, 12.1, 120.0]
  },
  {
    nome: 'Lucia',
    receitas: [9.8, 120.3, 340.2, 45.3],
    despesas: [450.2, 29.9]
  }
];

function calculoSaldo() {

  for ( let i = 0; i < usuarios.length; i++ ) {

    let receita = somaNumeros(usuarios[i].receitas) - somaNumeros(usuarios[i].despesas) // cálculo das receitas
    receita = receita.toFixed(2); // limita o valor a 2 casas decimais

    if ( receita > 0 ) {
      console.log(`${usuarios[i].nome} possui saldo POSITIVO de ${receita}!`)
    } else {
      console.log(`${usuarios[i].nome} possui saldo NEGATIVO de ${receita}!`)
    } // imprime uma mensagem com o resultado
  }
  return
}
// função que calcula a receita de todos os usuários em um vetor

function somaNumeros(numeros) {
  let soma = 0;
  for ( let i = 0; i < numeros.length; i++ ) {
    soma = soma + numeros[i];
  }
  return soma;
}
// função que calcula o somatórios dos valores dentro de um vetor

calculoSaldo();
>>>>>>> 82876af058933e7ca96427a1734539b283aee1f8
