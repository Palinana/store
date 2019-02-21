import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getFavourites, updateFavourites, deleteItem } from '../utils/favourites';

class Favourites extends Component {

    state = {
        favourites: getFavourites(),
    }

    render() {
        return (
            <div>
                {
                    this.state.favourites.map(item => {
                        return (
                            <h2>{item.name}</h2>
                        )
                    })
                }
                
            </div>
        )
    }
}

export default connect(null, null)(Favourites)
