import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const Products = (props) => {

    const {products} = props;
    console.log('props ', props)
    
    return (
        <div className="row">
            <Sidebar />
            <div className="col-md-9">            
                <div className="row">
                    {
                        products.map(product => {
                        return (
                            <div className="col-sm-3 col-md-4" key={product.id}>
                                <div className="card">
                                    <Link to={`/products/${product.id}`}>
                                    <img src={product.image} className="card-img-top" id="thumbnails" alt={product.name}/>
                                    </Link>
                                    <div className="card-body">
                                        <h3 className="product-name">{product.name}</h3>
                                        <h4 className="product-price">${product.price}</h4>  
                                    </div>
                                </div>
                            </div>
                        )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const mapState = (state, ownProps) => {

    const categoryId = Number(ownProps.match.params.categoryId) || null;

    const filterCb = (prodCat) => {
        if (!categoryId) return true;
        return prodCat === categoryId;
    }

    return {
        isAdmin: state.user.isAdmin,
        products: state.products.filter(product =>
        filterCb(product.categoryId)),
        categoryId
    }
}

export default connect(mapState)(Products)

Products.propTypes = {
    products: PropTypes.array.isRequired
}