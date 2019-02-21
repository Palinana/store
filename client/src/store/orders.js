import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ORDERS = 'GET_ORDERS'
const GET_ORDER = 'GET_ORDER'
/**
 * ACTION CREATORS
 */
const getOrders = orders => ({type: GET_ORDERS, orders})
const getOrder = order => ({type: GET_ORDER, order})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
    dispatch =>
        axios.get('/api/orders')
          .then(res =>
            dispatch(getOrders(res.data))
          )
          .catch(err => console.log(err))


export const fetchOrder = (id) =>
  dispatch =>
      axios.get(`/api/orders/${id}`)
        .then(res => res.data)
        .then(order => {
          console.log('order', order)
          dispatch(getOrder(order))
        })
        .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    case GET_ORDER:
      return action.order;
    default:
      return state;
  }
}