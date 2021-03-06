import React from 'react';
import { Link } from 'react-router-dom';

const Success = (props) => (
    <div className="container">
        <div className='row'>
            <div className="col-xs-12 mx-auto">
                <div className="page-header">
                    <h1 className="page-header__text">Thank You for Purchasing!</h1>
                </div>
                <h2 className="text-center order-number">Your order number is: {props.location.state.orderNumber}</h2>
            </div>
        </div>
        <div className='row'>
            <div className="col-xs-12 mx-auto mt-5 mb-3">
                <Link to={'/products'} className="arrow-back__name">
                    <svg className="arrow-back__icon">
                        <use xlinkHref="/images/sprite.svg#icon-chevron-with-circle-left"></use>
                    </svg>
                    Continue shopping
                </Link>
            </div>
        </div>
    </div>
)
  
export default (Success);