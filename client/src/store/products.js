import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const deleteProduct = id => ({type: DELETE_PRODUCT, id})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(getProducts(res.data)))
      .catch(err => console.error(err))
      
export const destroyProduct = (id) =>
  dispatch =>
    axios.delete(`/api/products/${id}`)
      .then(() => {
        dispatch(deleteProduct(id))
        history.push('/products')
      })
      .catch(err => console.log(err))
      
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.id);
    default:
      return state;
  }
}