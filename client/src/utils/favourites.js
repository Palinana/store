const FAVOURITES_STORAGE = 'favourites'

export const getFavourites = () => {
    return JSON.parse(window.localStorage.getItem(FAVOURITES_STORAGE)) || []
}

export const getFavouritesSize = () => {
    return getFavourites().reduce((prev, cur) => prev + cur.quantity, 0);
}

export const addToFavourites = (productId, name, price, image) => {
    
    let cart = getFavourites()
    let existing = cart.find(lineItem => lineItem.productId === productId)
    if (!existing) {
        cart.push({ productId, name, price, image })
    }    
    window.localStorage.setItem(FAVOURITES_STORAGE, JSON.stringify(cart))
}

export const updateFavourites = (productId, quantity) => {
    let cart = getFavourites()
    cart.find(lineItem => lineItem.productId === productId).quantity = quantity
    window.localStorage.setItem(FAVOURITES_STORAGE, JSON.stringify(cart))
}

export const deleteItem = productId => {
    let cart = getFavourites()
    cart = cart.filter(lineItem => lineItem.productId !== productId)
    window.localStorage.setItem(FAVOURITES_STORAGE, JSON.stringify(cart))
}

export const getTotal = () => {
    let cart = getFavourites()
    let total = 0;
    cart.forEach(lineItem => {
        total += lineItem.quantity*lineItem.price;
    })
    return total;
}

export const clearCart = () => {
    window.localStorage.setItem(FAVOURITES_STORAGE, JSON.stringify([]))
}