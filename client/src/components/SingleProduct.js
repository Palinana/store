import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateCartSize } from '../store';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { addToCart, getCartSize } from '../utils/cart';

class SingleProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity : 1
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleCartSubmit = this.handleCartSubmit.bind(this)
    }

    handleChange (event) {
        this.setState({ [event.target.name] : event.target.value })
    }

    handleCartSubmit(event) {
        event.preventDefault();
        
        addToCart(this.props.product.id, +this.state.quantity, this.props.product.price)
        
        this.props.updateCartSize(getCartSize());
    }

    render() {
        const { product } = this.props;

        return (
            <div className="row main-view">
                <Sidebar />
                <div className="col-md-10">
                    <div className="row product-page">
                        <div className="col-md-6">
                            <img src={product.image} alt={product.name} className="product-image"/>
                        </div>
                        
                        <div className="col-md-6">
                            <h4>${product.price}</h4>
                            <h3>{product.name}</h3>
                            <p id='product-description'>{product.description}</p>
                       
                            <div id="details">
                                <input type="number" name="quantity" value={this.state.quantity} onChange={this.handleChange} min="1" max={product.quantity}/>
                                {
                                    product.quantity ? 
                                        <Link
                                            to={{
                                            pathname: '/success',
                                            state: product}}
                                            onClick={this.handleCartSubmit}
                                            ><button>Add to Cart</button>
                                        </Link>
                                    : <h3>SOLD OUT</h3> 
                                }
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