import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Sidebar = (props) => (
    <div className="col-md-2">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3 className="sidebar-header__title">Category</h3>
                </div>
                <ul className="list-unstyled components">
                    {
                        props.categories.map(category => {
                        return (
                            <li className="sidebar-item" key={category.id}>  
                                <Link to={`/categories/${category.id}`} className="sidebar-item__link"> {category.name}</Link>
                            </li>
                        )})
                    }
                </ul>
            </nav>
    </div>
)

const mapState = state => {
  return {
    categories: state.categories
  }
}

export default connect(mapState)(Sidebar)
