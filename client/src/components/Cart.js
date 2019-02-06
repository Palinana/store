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
        <div className="row">
            <div class="col-xs-12 mx-auto">
                <div class="page-header">
                    <h1>Your Cart</h1>
                </div>
                {
                this.state.cart.length ?
                    
                    <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.cart.map(item => {
                            const product = products.find(p => p.id === item.productId)
                                return (
                                    <tr className='cart-item' key={product.id}>
                                        
                                        <td className="product-item">
                                            <img src={product.image} alt={product.name} className="cart-item__image"/>
                                            <Link to={`/products/${product.id}`} className="cart-item__name">{product.name} </Link>
                                        </td>
                                        
                                        <td>${product.price}</td>

                                        <td id=''>
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
                                            
                                        </td>
                                        <td>${(item.quantity * product.price).toFixed(2)}</td>
                                        <td>
                                            {
                                                item.quantity
                                                    ? <button onClick={this.handleDelete(product.id)}>Delete Item</button>
                                                    : <h3 id='sold-out'>SOLD OUT</h3>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>    
                : <small>cart is empty</small>
                }
                <div class="row justify-content-end">
                    {
                        +this.state.total
                            ? <div className='cart-checkout__total'>
                                <h3>Total:</h3>
                                <h3> ${this.state.total}</h3>
                            </div>
                            : null
                        }
                </div>
                {
                    this.state.cart.length ? 
                        <div className="row justify-content-end cart-checkout">
                            <Link to={{ pathname: '/checkout/shipping', state: { cart: this.state.cart, total: this.state.total } }}><button>Proceed to Shipping</button></Link>
                        </div>: null
                }
            </div>
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