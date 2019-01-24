import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Sidebar = (props) => (
    <div className="col-md-3">
        {/* <Link to='/products'>All Products</Link> */}
            <nav id="sidebar">
                <div className="sidebar-header">
                    <h3>Bootstrap Sidebar</h3>
                </div>
                <ul className="list-unstyled components">
                    {
                        props.categories.map(category => {
                        return (
                            <li key={category.id}>  
                            <Link to={`/categories/${category.id}`}> {category.name}</Link>
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
