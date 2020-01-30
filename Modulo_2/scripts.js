const modal = document.querySelector('.modal');
const mod = document.querySelector('.mod');
const images = document.querySelectorAll('.imagem');

for (let image of images) {
  image.addEventListener("click", function(){
    modal.classList.add('active')
    const siteId = image.getAttribute('id')
    modal.querySelector('iframe').src = `https://rocketseat.com.br/${siteId}`
  })
}

document.querySelector('.closemodal').addEventListener("click", function(){
  modal.classList.remove('active')
  mod.classList.remove('full')
  modal.querySelector('iframe').src = ""
})

document.querySelector('.maxmodal').addEventListener('click', function(){
  mod.classList.add('full')
})

document.querySelector('.minmodal').addEventListener('click', function(){
  mod.classList.remove('full')
})