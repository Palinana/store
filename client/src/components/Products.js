import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Search from './Search';
import { addToFavorites } from '../utils/favorites';

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            isDirty: false,
            limit: 8,
            color: '',
            addCloseButton: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.searchingFor = this.searchingFor.bind(this)
        this.onLoadMore = this.onLoadMore.bind(this)
        this.filterByColor = this.filterByColor.bind(this)
        this.addFavorites = this.addFavorites.bind(this)
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

    filterByColor(color, arr) {
        return arr.filter(elem => elem.color === color)
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

    handleChange (event) {
        this.setState({ search: event.target.value })
    }

    handleSubmit (event) {
        event.preventDefault();        
    }

    render() {
        let { products } = this.props; 
        const { limit, color } = this.state;
        let searchLength = this.state.search.length;
        let isDirty = searchLength ? true : false;

        // filter by color
        if(color) {
            products = this.filterByColor(color, products)
        }
        
        return (
            <div className="row main-view">
                <Sidebar color={this.state.color} handleClick={this.handleClick} addCloseButton={this.state.addCloseButton}/>
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
                                        <div className="col-md-6 col-lg-3 product__item" key={product.id}>
                                             <div class="card-group">
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
                                        </div>
                                    )
                                    })) : 
                                    <p className='main-view__no-match mx-auto'>No Match</p>
                                }
                            </div> : 
                        
                            <div className="row">
                                {
                                    products.slice(0,this.state.limit).map(product => {
                                    return (
                                        <div className="col-md-6 col-lg-3 product__item" key={product.id}>
                                            <div className="card-group">
                                                <div className="card">
                                                    <div className="view overlay">
                                                        <Link to={`/products/${product.id}`}>
                                                            <img src={product.image} className="card-img-top" id="thumbnails" alt={product.name}/>
                                                        </Link> 
                                                    </div>
                                                
                                                    <div className="card-body">
                                                        <div className="card-body__visible">
                                                            <h3 className="product-name">{product.name}</h3>
                                                            <h4 className="product-price">${product.price}</h4>  
                                                        </div>

                                                        <div className="card-body__invisible" onClick={() => this.addFavorites(product.id, product.name, product.price, product.image)}>
                                                            <svg className="heart__icon">
                                                                <use xlinkHref="/images/sprite.svg#icon-heart"></use>
                                                            </svg>  
                                                        </div>                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    })
                                }

                                { limit < products.length ? 
                                    <div className="row mx-auto">
                                        <button onClick={this.onLoadMore} className="btn-primary mx-auto">Load More</button>
                                    </div>
                                    : null
                                }
                            </div>
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