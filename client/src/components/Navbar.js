import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggled : false
        }
        this.toggleNavigaiton = this.toggleNavigaiton.bind(this)
    }

    toggleNavigaiton () {
        this.setState({ toggled : !this.state.toggled })
    }

    render() {
        const { handleClick, isLoggedIn, email, cartSize } = this.props;
        let { toggled } = this.state;

        return (
            <nav className="navbar navbar-toggleable-sm navbar-expand-sm navbar-light bg-light">
                <Link to='/' className="navbar-brand" href="#">Nova</Link>
                <button class="navbar-toggler collapsed" onClick={this.toggleNavigaiton} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">            
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div className={`${toggled ? "navbar-collapse" : " collapse navbar-collapse"}`} id="navbarSupportedContent">
                { 
                    isLoggedIn ? (
                        <ul className="nav navbar-nav ml-auto top-nav">
                            <li className="nav-item"><Link to="/" className="nav-link">Hello, {email}</Link></li>
                            <li className="nav-item" id="favourites">
                                <Link to="/favorites">
                                    <svg className="cart__icon">
                                        <use xlinkHref="/images/sprite.svg#icon-heart"></use>
                                    </svg>
                                </Link>
                            </li>
                            { !toggled ? <li className="nav-link"><span className="straight-bar"> | </span></li> : null}
                            <li className="nav-item"><a href="#" onClick={handleClick} className="nav-link">
                                Logout
                            </a></li>
                            <li className="nav-item">
                                <Link to="/cart">
                                    <svg className="cart__icon">
                                        <use xlinkHref="/images/sprite.svg#icon-shopping-cart"></use>
                                    </svg>
                                        <span className="cart-item_total">{cartSize}</span>
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        <ul className="nav navbar-nav ml-auto top-nav">
                            <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
                            { !toggled ? <li className="nav-link"><span className="straight-bar"> | </span></li> : null}
                            
                            <li className="nav-item"><Link to="/signup" className="nav-link">Sign Up</Link></li>
                            <li className="nav-item" id="favourites">
                                <Link to="/favorites">
                                    <svg className="cart__icon">
                                        <use xlinkHref="/images/sprite.svg#icon-heart"></use>
                                    </svg>
                                </Link>
                            </li>
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
    }
}

const mapState = state => {
    return {
        isLoggedIn: !!state.user.id,
        email: state.user.email,
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