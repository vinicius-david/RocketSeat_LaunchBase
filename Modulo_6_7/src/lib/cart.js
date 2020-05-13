const { formatPrice } = require('./utils')

// save cart in req.session
const Cart = {
  init(oldCart) {

    if (oldCart) {
      this.items = oldCart.items
      this.total = oldCart.total
    } else {
      this.items = [];
      this.total = {
        quantity: 0,
        price: 0,
        formattedPrice: formatPrice(0)
      }
    }

    return this
  },
  getCartItem(productId) {
    return this.items.find(item => item.product.id == productId)
  },
  addOne(product) {

    let inCart = this.getCartItem(product.id)

    if (!inCart) {
      inCart = {
        product: {
          ...product,
          formattedPrice: formatPrice(product.price)
        },
        quantity: 0,
        price: 0,
        formattedPrice: formatPrice(0)
      }

      this.items.push(inCart)
    }

    if (inCart.quantity >= product.quantity) return this

    inCart.quantity++
    inCart.price = inCart.product.price * inCart.quantity
    inCart.formattedPrice = formatPrice(inCart.price)

    this.total.quantity++
    this.total.price += inCart.product.price
    this.total.formattedPrice = formatPrice(this.total.price)

    return this
  },
  removeOne(productId) {

    // get item in cart
    const inCart = this.getCartItem(productId)

    // check if exists
    if (!inCart) return this

    // update item
    inCart.quantity--
    inCart.price = inCart.product.price * inCart.quantity
    inCart.formattedPrice = formatPrice(inCart.price)

    // update cart
    this.total.quantity--
    this.total.price -= inCart.product.price
    this.total.formattedPrice = formatPrice(this.total.price)

    // check if quantity is 0
    if (inCart.quantity < 1) {

      this.items = this.items.filter(item => item.product.id != inCart.product.id)

      // // another method
      // const itemIndex = this.items.indexOf(inCart)
      // this.items.splice(itemIndex, 1)

      return this
    }

    return this
  },
  delete(productId) {

    const inCart = this.getCartItem(productId)

    if (!inCart) return this

    if (this.items.length > 0) {

      this.total.quantity -= inCart.quantity
      this.total.price -= (inCart.product.price * inCart.quantity)
      this.total.formattedPrice = formatPrice(this.total.price)
    }

    this.items = this.items.filter(item => inCart.product.id != item.product.id)

    return this
  }  
}

module.exports = Cart