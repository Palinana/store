import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout'
import history from '../history'
import { clearCart } from '../utils/cart'

const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
? 'http://putherokuhere.com' 
: 'http://localhost:5000/api/checkout/payment';

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'product'
? 'pk_test_ifL68KcdvyP86xfWifl8kvDn' 
: 'pk_test_ifL68KcdvyP86xfWifl8kvDn';

const CURRENCY = 'USD';

const successPayment = data => {
    alert('Payment Successful!')
    setTimeout(
        function() {
            clearCart();
            history.push('/products')
        }
        .bind(this),
        2000
    );
}
const errorPayment = data => alert('Payment Error!')

const onToken = (amount, description, userId, cart) => token =>
  axios.post('/api/orders',
    {
      userId, 
      confirmationCode: userId + amount, 
      cart, 
      total: amount
    })
    .then(successPayment)
    .catch(errorPayment);

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
            complete: false
        }
    }

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
        /* Card test info:
            js@gmail.com
            4242424242424242
            08/2020
            4242
        */
        
        const { user, cart, total } = this.props.location.state
        return (
          <div className='login-page-container'>
                <h3>Shipping Details:</h3>
                <div className='shipping'>
                    <form id='shipping-form'>
                        <label>Address Line 1 *</label>
                        <input type='text' name='address' placeholder='ex: 123 Self-Improvement Rd' onChange={this.handleChange}/>
                        <label>City *</label>
                        <input type='text' name='city' placeholder='ex: New York' onChange={this.handleChange}/>
                        <label>State *</label>
                        <input type='text' name='state' placeholder='ex: NY' onChange={this.handleChange}/>
                        <label>Zip Code *</label>
                        <input type='text' name='zip' placeholder='ex: 10004' onChange={this.handleChange}/>
                        <label>Country *</label>
                        <input type='text' name='country' placeholder='ex: USA' onChange={this.handleChange}/>
                    </form>
                </div>
                <br/>
                <StripeCheckout
                    description={`Charge for ${user.email}`}
                    amount={+total}
                    token={onToken(total,`Charge for ${user.email}`, user.id, cart)}
                    currency={CURRENCY}
                    stripeKey={STRIPE_PUBLISHABLE}
                />
          </div>
        )
    }
}

export default connect(null, null)(Checkout)