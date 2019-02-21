import { getFavouritesSize } from '../utils/favourites';

/**
 * ACTION TYPES
 */
const GOT_FAVS_SIZE = 'GOT_FAVS_SIZE'

/**
 * ACTION CREATORS
 */
const gotFavouritesSize = (size) => ({ type: GOT_FAVS_SIZE, size })

/**
 * THUNK CREATORS
 */
export const updateFavouritesSize = () =>
    dispatch =>
        dispatch(gotFavouritesSize(getFavouritesSize()))

/**
 * REDUCER
 */
export default function (state = 0, action) {
    switch (action.type) {
        case GOT_FAVS_SIZE:
            return action.size;
        default:
            return state;
    }
}