const nome = 'Vinícius';
const peso = 73;
const altura = 1.84;

const imc = peso / (altura * altura);

if (imc >= 30) {
  console.log('Vinícius, você está acima do peso');
} else {
  console.log('Vinícius, você não está acima do peso');
}
