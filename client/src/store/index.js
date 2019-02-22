import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import categories from './categories';
import products from './products';
import cart from './cart';
import user from './user';
import orders from './orders';
import favorites from './favorites';

const reducer = combineReducers({user, categories, products, cart, orders, favorites})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './categories'
export * from './products'
export * from './cart'
export * from './orders'
export * from './favorites'