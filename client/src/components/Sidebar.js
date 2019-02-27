import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryToggled: true,
            colorToggled: true
        }
        this.toggleCategory = this.toggleCategory.bind(this)
        this.toggleColor = this.toggleColor.bind(this)
    }
    
    toggleCategory () {
        this.setState({ categoryToggled: !this.state.categoryToggled })
    }

    toggleColor () {
        this.setState({ colorToggled: !this.state.colorToggled })
    }

    render() {
        let { categoryToggled, colorToggled } = this.state;

        return (
        <div className="col-md-3 col-lg-2" id="sidebar-box">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3 className="sidebar-header__title">Category</h3>
                    <svg className="cart__icon dropdown__icon" onClick={this.toggleCategory}>
                        <use xlinkHref="/images/sprite.svg#icon-chevron-with-circle-down"></use>
                    </svg>
                </div>
                { categoryToggled ? 
                    <ul className="list-unstyled components dropdown">
                        {
                            this.props.categories.map(category => {
                            return (
                                <li className="sidebar-item" key={category.id}>  
                                    <Link to={`/categories/${category.id}`} className="sidebar-item__link">{category.name}</Link>
                                </li>
                            )})
                        }
                    </ul> : null
                }
                
                <div className="sidebar-header">
                    <h3 className="sidebar-header__title">Colors</h3>
                    <svg className="cart__icon dropdown__icon" onClick={this.toggleColor}>
                        <use xlinkHref="/images/sprite.svg#icon-chevron-with-circle-down"></use>
                    </svg>
                </div>
                { colorToggled ? 
                    <ul className="list-unstyled components">
                        {
                            this.props.colors.map((color, ind) => {
                            return (
                                <li className="sidebar-item__link" key={ind} >
                                    <span className="sidebar-color__circle" id={color} onClick={() => {this.props.handleClick(color, ind)}}></span>{color}
                                        <svg className={this.props.addCloseButton === ind ? "sidebar__icon" : "sidebar__icon-removed" }  onClick={() => {this.props.handleClick('', -1)}}>
                                            <use xlinkHref="/images/sprite.svg#icon-block"></use>
                                        </svg> 
                                </li>
                            )})
                        }
                    </ul> : null
                }
            </nav>
        </div> 
    )
}
}
const mapState = state => {
    const uniqueColors = Array.from(new Set(state.products.map(elem => elem.color)))

    return {
        categories: state.categories,
        colors: uniqueColors.sort()
    }
}

export default connect(mapState)(Sidebar);