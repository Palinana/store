import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Search from './Search'


class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            isDirty: false,
            limit: 8
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.searchingFor = this.searchingFor.bind(this)
        this.onLoadMore = this.onLoadMore.bind(this)
    }
    
    searchingFor(search){
        return function(x){
          return x.name.toLowerCase().includes(search.toLowerCase() || !search)
        }
    }

    onLoadMore() {
        this.setState({
            limit: this.state.limit + 8
        });
    }

    handleChange (event) {
        this.setState({ search: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();        
    }

    render() {
        const { products } = this.props;
        const { limit } = this.state;
        let searchLength = this.state.search.length;
        let isDirty = searchLength ? true : false;
        
        return (
            <div className="row main-view">
                <Sidebar />
                <div className="col-md-10">  
                    <div className="row product-search">
                        <Search handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
                    </div>  

                    {
                        isDirty ? 
                            <div className="row">
                                {  products.filter(this.searchingFor(this.state.search)).length ?
                                    (products.filter(this.searchingFor(this.state.search)).map(product => {
                                    return (
                                        <div className="col-sm-3 col-md-3 product__item" key={product.id}>
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
                                    })) : <p className='row'>No Match</p>
                                }
                            </div> : 
                        
                            <div className="row">
                                {
                                    products.slice(0,this.state.limit).map(product => {
                                    return (
                                        <div className="col-sm-3 col-md-3 product__item" key={product.id}>
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
                    }

                    { limit < products.length ? 
                        <div className="row">
                            <button onClick={this.onLoadMore} className="btn-primary mx-auto">Load More</button>
                        </div>
                        : null
                    }
                    
                </div>
            </div>
        )
    }
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