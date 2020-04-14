const modal = document.querySelector('.modal');
const imgs = document.querySelectorAll('#imagens');

for ( let img of imgs ) {
  img.addEventListener("click", function() {
    modal.classList.add('active')
  })
}

document.querySelector('.closemodal').addEventListener("click", function(){
  modal.classList.remove('active')
})
