const CART_STORAGE = 'cart'

export const getCart = () => {
    return JSON.parse(window.localStorage.getItem(CART_STORAGE)) || []
}

export const getCartSize = () => {
    return getCart().reduce((prev, cur) => prev + cur.quantity, 0);
}

export const addToCart = (productId, quantity, price) => {
    
    let cart = getCart()
    let existing = cart.find(lineItem => lineItem.productId === productId)
    if (existing) {
        existing.quantity+=quantity
    } else {
        cart.push({ productId , quantity, price })
    }
    window.localStorage.setItem(CART_STORAGE, JSON.stringify(cart))
}

export const updateCart = (productId, quantity) => {
    let cart = getCart()
    cart.find(lineItem => lineItem.productId === productId).quantity = quantity
    window.localStorage.setItem(CART_STORAGE, JSON.stringify(cart))
}

export const deleteItem = productId => {
    let cart = getCart()
    cart = cart.filter(lineItem => lineItem.productId !== productId)
    window.localStorage.setItem(CART_STORAGE, JSON.stringify(cart))
}

export const getTotal = () => {
    let cart = getCart()
    let total = 0;
    cart.forEach(lineItem => {
        total += lineItem.quantity*lineItem.price;
    })
    return total;
}

export const clearCart = () => {
    window.localStorage.setItem(CART_STORAGE, JSON.stringify([]))
}