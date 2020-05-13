module.exports = {
  async post(req, res, next) {
    
    const keys = Object.keys(req.body)

    for (key of keys) {
      if ( req.body[key] == '' ) {
        return res.send('Por favor, preencha todos os campos')
      }
    }

    if (!req.files || req.files.length == 0) {
      return res.send('Envie ao menos uma imagem.')
    }

    next()
  },
  put(req, res, next) {

    const keys = Object.keys(req.body)

      for (key of keys) {
        if ( req.body[key] == '' && key != 'removed_files' ) {
          return res.send('Por favor, preencha todos os campos')
        }
      }

      next()
  }
}