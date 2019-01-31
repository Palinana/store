import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn, cartSize }) => (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to='/' className="navbar-brand" href="#">Nova</Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

        { 
            isLoggedIn ? (
                <ul className="nav navbar-nav ml-auto top-nav">
                    <li className="nav-item"><Link to="/home" className="nav-link">Account</Link></li>
                    <li className="nav-link"><span className="straight-bar"> | </span></li>
                    <li className="nav-item"><a href="#" onClick={handleClick} className="nav-link">
                        Logout
                    </a></li>
                    <li className="nav-item"><Link to="/checkout">
                        <img id='cart-img' alt="shopping cart" src='/images/money-bag.png' className="nav-link"/><span>Cart</span>
                        </Link></li>
                </ul>
            ) : (
                <ul className="nav navbar-nav ml-auto top-nav">
                    <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                    <li className="nav-link"><span className="straight-bar"> | </span></li>
                    <li className="nav-item"><Link to="/signup" className="nav-link">Sign Up</Link></li>
                    <li className="nav-item">
                        <Link to="/cart">
                        <svg className="cart__icon">
                            <use xlinkHref="/images/sprite.svg#icon-shopping-cart"></use>
                        </svg>
                            <span className="cart-item_total">{cartSize}</span>
                        </Link>
                    </li>
                </ul>
        )}
        
        </div>
    </nav>
)

const mapState = state => {
    return {
        isLoggedIn: !!state.user.id,
        cartSize: state.cart
    }
}

const mapDispatch = dispatch => {
    return {
        handleClick() {
            dispatch(logout())
        }
    }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}