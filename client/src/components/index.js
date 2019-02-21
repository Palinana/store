/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './Navbar';
export {default as Sidebar} from './Sidebar';
export {default as Footer} from './Footer';
export {default as Products} from './Products';
export {default as SingleProduct} from './SingleProduct';
export {default as Cart} from './Cart';
export {default as Checkout} from './Checkout';
export {default as Success} from './Success';
export {default as Favourites} from './Favourites';
export {default as Search} from './Search';
export {Login, Signup} from './Auth-form';