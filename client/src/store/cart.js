import { getCartSize } from '../utils/cart';

/**
 * ACTION TYPES
 */
const GOT_CART_SIZE = 'GET_CART_SIZE'

/**
 * ACTION CREATORS
 */
const gotCartSize = (size) => ({ type: GOT_CART_SIZE, size })

/**
 * THUNK CREATORS
 */
export const updateCartSize = () =>
    dispatch =>
        dispatch(gotCartSize(getCartSize()))

/**
 * REDUCER
 */
export default function (state = 0, action) {
    switch (action.type) {
        case GOT_CART_SIZE:
            return action.size;
        default:
            return state;
    }
}