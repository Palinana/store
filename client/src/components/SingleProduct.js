import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCartSize } from '../store';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { addToCart, getCartSize } from '../utils/cart';
import { addToFavorites } from '../utils/favorites';

class SingleProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity : 1,
            color: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCartSubmit = this.handleCartSubmit.bind(this)
        this.addFavorites = this.addFavorites.bind(this)
        this.handleClick = this.handleClick.bind(this)

    }

    handleChange (event) {
        this.setState({ [event.target.name] : event.target.value })
    }

    handleCartSubmit(event) {
        event.preventDefault();
        
        addToCart(this.props.product.id, +this.state.quantity, this.props.product.price)
        
        this.props.updateCartSize(getCartSize());
    }

    addFavorites (id, name, price, image) {
        addToFavorites(id, name, price, image)
    }

    handleClick (value, id) {
        //if id doesn't belogn to a color, set it to null, otherwise add close button to current color
        if (id === -1) this.setState({ addCloseButton: id })
        if (value) this.setState({ addCloseButton: id })
        this.setState({ color: value })
        console.log('this.state.addCloseButton ', this.state.addCloseButton)
    }

    render() {
        const { product } = this.props;
        const { color } = this.state;

        if(color) {
            this.props.history.push({
                pathname: '/products',
                state: { filterColor: color }
            })
        }

        return (
            <div className="row main-view">
                <Sidebar color={this.state.color} handleClick={this.handleClick}/>
                <div className="col-md-10">
                    <div className="row product-page">
                        <div className="col-md-6 product-section__image">
                            <img src={product.image} alt={product.name} className="product-image"/>
                        </div>
                        
                        <div className="col-md-6">
                            <h3 className="product-info__name">{product.name}</h3>
                            <h4 className="product-info__price">${product.price}</h4>
                            <p className="product-info__description" id='product-description'>{product.description}</p>
                       
                            <div id="details">
                                <input className="form-control product-info__quantity" type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} min="1" max={product.quantity}/>
                                {
                                    product.quantity ? 
                                        <Link
                                            to={{
                                            pathname: '/success',
                                            state: product}}
                                            onClick={this.handleCartSubmit}
                                            ><button className="product-add">Add to Cart</button>
                                        </Link>
                                    : <h3>SOLD OUT</h3> 
                                }
                                <div className="heart__icon-box" onClick={() => this.addFavorites(product.id, product.name, product.price, product.image)}>
                                    <svg className="heart__icon-single">
                                        <use xlinkHref="/images/sprite.svg#icon-heart"></use>
                                    </svg> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state, ownProps) => {

    const productId = Number(ownProps.match.params.productId);
    return {
        product: state.products.find(product => product.id === productId) || {}
    }
}

const mapDispatch = dispatch => {
    return {
        updateCartSize() {
            dispatch(updateCartSize());
        }
    }
}

export default connect(mapState, mapDispatch)(SingleProduct)

SingleProduct.propTypes = {
    updateCartSize: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired
}