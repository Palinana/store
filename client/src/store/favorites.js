import { getFavoritesSize } from '../utils/favorites';

/**
 * ACTION TYPES
 */
const GOT_FAVS_SIZE = 'GOT_FAVS_SIZE'

/**
 * ACTION CREATORS
 */
const gotFavoritesSize = (size) => ({ type: GOT_FAVS_SIZE, size })

/**
 * THUNK CREATORS
 */
export const updateFavoritesSize = () =>
    dispatch =>
        dispatch(gotFavoritesSize(getFavoritesSize()))

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