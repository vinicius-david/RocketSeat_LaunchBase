const nome = 'Vinícius';
const sexo = 'Masculino';
const idade = 60;
const contribuicao = 35;

if ( ((contribuicao >= 35 || (idade + contribuicao) >= 95) && sexo === 'Masculino' ) || 
    ((contribuicao >= 30 || (idade + contribuicao) >= 85) && sexo === 'Feminino')) {
  console.log(`${nome}, você pode se aposentar!`);
} else {
  console.log(`${nome}, você ainda não pode se aposentar!`);
}
