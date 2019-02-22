const FAVORITES_STORAGE = 'favorites'

export const getFavorites = () => {
    return JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE)) || []
}

export const getFavoritesSize = () => {
    return getFavorites().reduce((prev, cur) => prev + cur.quantity, 0);
}

export const addToFavorites = (productId, name, price, image) => {
    
    let favorites = getFavorites()
    let existing = favorites.find(lineItem => lineItem.productId === productId)
    if (!existing) {
        favorites.push({ productId, name, price, image })
    }    
    window.localStorage.setItem(FAVORITES_STORAGE, JSON.stringify(favorites))
}

export const updateFavorites = (productId, quantity) => {
    let favorites = getFavorites()
    favorites.find(lineItem => lineItem.productId === productId).quantity = quantity
    window.localStorage.setItem(FAVORITES_STORAGE, JSON.stringify(favorites))
}

export const deleteItem = productId => {
    let favorites = getFavorites()
    favorites = favorites.filter(lineItem => lineItem.productId !== productId)
    window.localStorage.setItem(FAVORITES_STORAGE, JSON.stringify(favorites))
}

export const getTotal = () => {
    let favorites = getFavorites()
    let total = 0;
    favorites.forEach(lineItem => {
        total += lineItem.quantity*lineItem.price;
    })
    return total;
}

export const clearFavorites = () => {
    window.localStorage.setItem(FAVORITES_STORAGE, JSON.stringify([]))
}