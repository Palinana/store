import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, updateCart, deleteItem, getTotal } from '../utils/cart';
import { updateCartSize } from '../store';

class Cart extends Component {

    state = {
        quantity: 0,
        cart: getCart(),
        editingProductId: null,
        currentEditQuantity: '',
        total: getTotal().toFixed(2)
    }

    handleEdit = (productId, quantity) => event => {
        this.setState({ editingProductId: productId, currentEditQuantity: '' + quantity })
    }

    handleDelete = productId => event => {
        deleteItem(productId);
        this.setState({ cart: getCart(), total: getTotal().toFixed(2) })
        this.props.updateCartSize();
    }

    handleUpdate = productId => event => {
        this.setState({ editingProductId: null })
        updateCart(productId, +this.state.currentEditQuantity)
        this.setState({ cart: getCart(), total: getTotal().toFixed(2) })
        this.props.updateCartSize();
    }

    updateEditQuantity = event => {
        this.setState({ currentEditQuantity: event.target.value });
    }

    render() {

        const { products } = this.props

        if (!products.length) {
            return null;
        }

        return (
        <div className="checkout">
            <h3>Cart</h3>
            {
            this.state.cart.length
                ? this.state.cart.map(item => {
                const product = products.find(p => p.id === item.productId)
                return (
                    <div className='cart-item' key={product.id}>
                    <div className="product-item">
                        <Link to={`/products/${product.id}`}>
                        <img src={product.image} alt={product.name}/>
                        <h4>${product.price}</h4>
                        <h3>{product.name}</h3>
                        </Link>
                    </div>
                    <div id='quantity'>
                        {
                        this.state.editingProductId === product.id
                            ? <div>
                            <h3>Qty: <input type="number" name="quantity" value={this.state.currentEditQuantity} onChange={this.updateEditQuantity} min="1" max={product.quantity} /></h3>
                            <button onClick={this.handleUpdate(product.id)}>Update Quantity</button>
                            </div>
                            : <div>
                            <h3>Qty: {item.quantity}</h3>
                            {
                                !this.state.editingProductId &&
                                <button onClick={this.handleEdit(product.id, item.quantity)}>Edit Quantity</button>
                            }
                            </div>
                        }
                        {
                        item.quantity
                            ? <button onClick={this.handleDelete(product.id)}>Delete Item</button>
                            : <h3 id='sold-out'>SOLD OUT</h3>
                        }
                    </div>
                    </div>
                )
                })
                : <small>cart is empty</small>
            }
            {
            +this.state.total
                ? <div className='cart-item total'>
                <h3>Total:</h3>
                <h3> ${this.state.total}</h3>
                </div>
                : null
            }
            {
            this.state.cart.length
                ? <Link to={{ pathname: '/checkout/shipping', state: { cart: this.state.cart, total: this.state.total } }}><button>Proceed to Shipping</button></Link>
                : null
            }
        </div>
        )
    }
}

const mapState = state => {
    return {
        products: state.products
    }
}

const mapDispatch = dispatch => {
    return {
        updateCartSize() {
            dispatch(updateCartSize());
        }
    }
}

export default connect(mapState, mapDispatch)(Cart)

Cart.propTypes = {
    updateCartSize: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
}