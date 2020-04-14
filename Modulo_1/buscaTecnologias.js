<<<<<<< HEAD
const usuarios = [
  { nome: 'Carlos', tecnologias: ['HTML', 'CSS'] },
  { nome: 'Jasmine', tecnologias: ['JavaScript', 'CSS'] },
  { nome: 'Tuane', tecnologias: ['HTML', 'Node.js'] }
];

for (let i = 0; i < usuarios.length; i++) {

  if((usuarios[i].tecnologias[i] == 'CSS') || (usuarios[i].tecnologias[i+1] == 'CSS')) {
    console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`);
  }
}
// FOR que retorna uma mensagem caso o usuário trabalhe com CSS
=======
const usuarios = [
  { nome: 'Carlos', tecnologias: ['HTML', 'CSS'] },
  { nome: 'Jasmine', tecnologias: ['JavaScript', 'CSS'] },
  { nome: 'Tuane', tecnologias: ['HTML', 'Node.js'] }
];

for (let i = 0; i < usuarios.length; i++) {

  if((usuarios[i].tecnologias[i] == 'CSS') || (usuarios[i].tecnologias[i+1] == 'CSS')) {
    console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`);
  }
}
// FOR que retorna uma mensagem caso o usuário trabalhe com CSS
>>>>>>> 82876af058933e7ca96427a1734539b283aee1f8
