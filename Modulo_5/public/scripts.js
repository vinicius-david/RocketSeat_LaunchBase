function paginate(totalPages, selectedPage) {

  let pages = [],
    oldPage

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPages = currentPage == 1 || currentPage == totalPages
    const pagesBeforeSelected = currentPage >= selectedPage - 2
    const pagesAfterSelected = currentPage <= selectedPage + 2

    if ( firstAndLastPages || pagesBeforeSelected && pagesAfterSelected ) {

      if (oldPage && currentPage - oldPage > 2) {
        pages.push('...')
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1)
      }

      pages.push(currentPage)

      oldPage = currentPage
    }
  }

  return pages
}

const pagination = document.querySelector('.pagination')

if (pagination) {
  const page = +pagination.dataset.page
  const total = +pagination.dataset.total
  const busca = pagination.dataset.busca
  const pages = paginate(total, page)

  let elements = ""

  for (let page of pages) {

    if (String(page).includes('...')) {

      elements += `<span>${page}</span>`

    } else {

      if (busca) {

        elements += `<a href='?page=${page}&busca=${busca}'>${page}<a/>`
      } else {

        elements += `<a href='?page=${page}'>${page}<a/>`
      }
    }
  }

  pagination.innerHTML = elements
}


