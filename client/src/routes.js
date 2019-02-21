import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login, Signup, Products, SingleProduct, Cart, Checkout, Success } from './components';
import { me, fetchProducts, fetchCategories, updateCartSize } from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup}/>
        <Route path='/products/:productId' component={SingleProduct}/>
        <Route path='/categories/:categoryId' component={Products}/>
        <Route exact path="/cart" component={Cart}/>
        <Route exact path="/checkout" component={Checkout}/>
        <Route exact path="/success" component={Success}/>
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/" component={Products}/>
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Products} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(fetchCategories())
      dispatch(fetchProducts())
      dispatch(updateCartSize())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}