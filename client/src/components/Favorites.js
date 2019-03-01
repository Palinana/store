import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFavorites, deleteItem } from '../utils/favorites';
import { updateCartSize } from '../store';
import { addToCart, getCartSize } from '../utils/cart';
import swal from 'sweetalert';

class Favorites extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favorites: getFavorites(),
            quantity : 1
        }
        this.removeFavorite = this.removeFavorite.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCartSubmit = this.handleCartSubmit.bind(this)
    }

    removeFavorite(productId) {
        deleteItem(productId)
        this.setState({ favorites: getFavorites() })
    }

    handleChange (event) {
        this.setState({ [event.target.name] : event.target.value })
    }

    handleCartSubmit = (id, price) => event=> {
        event.preventDefault();
        addToCart(id, +this.state.quantity, price)
        
        this.props.updateCartSize(getCartSize());
        swal({
            title: "Added to Cart",
            icon: "success",
            timer: 2000
        });
    }

    render() {
        const { products } = this.props

        if (!products.length) {
            return null;
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 mx-auto">
                        <div className="page-header">
                            <h1 className="page-header__text">Favorite Items:</h1>
                        </div>
                        
                        <div className="row favorites">
                            {
                                this.state.favorites.length ?

                                this.state.favorites.map(item => {
                                    const product = products.find(p => p.id === item.productId)
                                    return (
                                        <div className={this.state.favorites.length > 1 ? "col-xs-12 col-sm-6 col-md-4 col-lg-3 favorites-box text-center mx-auto" : "col-sm-6 col-md-4 col-lg-6 favorites-box text-center mx-auto"} key={product.name}>
                                            <svg className="remove__icon" onClick={() => this.removeFavorite(product.id)}>
                                                <use xlinkHref="/images/sprite.svg#icon-circle-with-cross"></use>
                                            </svg>
                                            <Link to={`/products/${product.id}`}>
                                                <img src={product.image} className="card-img-top" id="thumbnail" alt={product.name}/>                            
                                            </Link>
                                            <h2 className="product-name">{product.name}</h2>
                                            <h3 className="product-price" id="favorite-price">{product.price}</h3>
                                            <div className="form-group input-group" id="favorite-form" key={product.name}>
                                                <input className="form-control product-info__quantity" id="favorite-input" type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} min="1" max={product.quantity}/>
                                            </div>
                                            <div className="favorite-btn">
                                                <button className="favorite-add" onClick={this.handleCartSubmit(product.id, product.price)}>Add to Cart</button>
                                            </div>
                                        </div>    
                                    )
                                })
                                : 
                                <h2 className="text-center cart-empty">No Favorites at the Moment</h2>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = state => {
    return {
        products: state.products,
        user: state.user
    }
}

const mapDispatch = dispatch => {
    return {
        updateCartSize() {
            dispatch(updateCartSize());
        }
    }
}

export default connect(mapState, mapDispatch)(Favorites)
