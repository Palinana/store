import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { clearCart } from '../utils/cart';
import { getCartSize } from '../utils/cart';
import { updateCartSize } from '../store';


// const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
// ? 'http://putherokuhere.com' 
// : 'http://localhost:5000/api/checkout/payment';

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'product'
? 'pk_test_ifL68KcdvyP86xfWifl8kvDn' 
: 'pk_test_ifL68KcdvyP86xfWifl8kvDn';

const CURRENCY = 'USD';
 /* Card test info:
    js@gmail.com
    4242424242424242
    08/2020
    4242
*/

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
            complete: false
        } 
    }

    onToken = (amount, description, userId, cart) => token =>
        axios.post('/api/orders',
            {
            userId, 
            confirmationCode: Math.floor((amount + amount) * 2000), 
            cart, 
            total: amount
            })
            .then(this.successPayment)
            .catch(this.errorPayment);

    successPayment = data => {
        console.log('Payment data!', data.data.confirmationCode)
        setTimeout(
            function() {
                clearCart();
                this.props.updateCartSize(getCartSize());
                this.props.history.push({
                    pathname: '/success',
                    state: { orderNumber: data.data.confirmationCode }
                })
            }
            .bind(this),
            1000
        );
    }
    errorPayment = data => alert('Payment Error!')
            
    handleChange = event => {
        this.setState({
          [event.target.name] : event.target.value
        })
        if (this.state.address && this.state.ity && this.state.tate && this.state.zip && this.state.country) { 
          this.state.complete = true; 
        } else {
          this.state.complete = false;
        }
    }

    render() {
        const { user, cart, total } = this.props.location.state
        let fixedTotal = total * 100 //for the stripe popup

        return (
          <div className='container'>
                <div className='row'>   
                    <div className="col-xs-12 mx-auto">
                        <div className="page-header">
                            <h1 className="page-header__text">Shipping Details:</h1>
                        </div>
                        <div className='shipping'>
                            <form id='shipping-form'>
                                <div className="form-group input-group">
                                    <input className="form-control form__input" name="address" type="text" placeholder="Address" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group input-group">
                                    <input className="form-control form__input" name="city" type="text" placeholder="City" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group input-group">
                                    <input className="form-control form__input" name="state" type="text" placeholder="State" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group input-group">
                                    <input className="form-control form__input" name="zip" type="text" placeholder="Zip Code" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group input-group">
                                    <input className="form-control form__input" name="country" type="text" placeholder="Country" onChange={this.handleChange}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="col-xs-12 text-center">
                    <StripeCheckout
                        description={`Charge for ${user.email}`}
                        amount={fixedTotal}
                        token={this.onToken(+total,`Charge for ${user.email}`, user.id , cart)}
                        currency={CURRENCY}
                        stripeKey={STRIPE_PUBLISHABLE}
                    />
                </div>
          </div>
        )
    }
}

const mapDispatch = dispatch => {
    return {
        updateCartSize() {
            dispatch(updateCartSize());
        }
    }
}

export default connect(null, mapDispatch)(Checkout)