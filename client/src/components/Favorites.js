import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFavorites, updateFavorites, deleteItem } from '../utils/favorites';

class Favorites extends Component {
    constructor() {
        super()
        this.state = {
            favorites: getFavorites()
        }
        this.removeFavorite = this.removeFavorite.bind(this)
    }

    removeFavorite(productId) {
        deleteItem(productId)
        this.setState({ favorites: getFavorites() })
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
                                        <div className="col-md-6 col-lg-3 favorites-box text-center" key={product.name}>
                                            <svg className="remove__icon" onClick={() => this.removeFavorite(product.id)}>
                                                <use xlinkHref="/images/sprite.svg#icon-circle-with-cross"></use>
                                            </svg>
                                            <img src={product.image} className="card-img-top" id="thumbnail" alt={product.name}/>                            
                                            <h2 className="">{product.name}</h2>
                                            <h3 className="">{product.price}</h3>
                                            <button className="favorite-add">Add to Cart</button>
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

export default connect(mapState, null)(Favorites)
