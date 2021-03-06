const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .header-links a')

for (item of menuItems) {
  if (currentPage ==  item.getAttribute('href')) {
    item.classList.add('active')
  }
}


const visibility = document.querySelectorAll(".visibility");
const hide = document.querySelectorAll(".show-hide");

function esconder(index) {
  visibility[index].addEventListener("click", () => {
    if (hide[index].classList.contains("hide")) {
      hide[index].classList.remove("hide");
      visibility[index].innerHTML = 'Esconder';
    } else {
      hide[index].classList.add("hide");
      visibility[index].innerHTML = 'Mostrar';
    }
  });
}

for (i = 0; i <= 2; i++) {
    esconder(i);
}

const ImageGallery = {
  highlight: document.querySelector('.gallery .highlight > img'),
  previews: document.querySelectorAll('.gallery-preview img'),
  setImage(e) {
    const { target } = e

    ImageGallery.previews.forEach(preview => preview.classList.remove('active'))

    target.classList.add('active')

    ImageGallery.highlight.src = target.src
  }
};