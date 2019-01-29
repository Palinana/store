import React from 'react';

const Search = ({handleChange, handleSubmit}) => {
    return (
        <form action="#" className="search" onSubmit={handleSubmit}>
            <input type="text" className="search__input" onChange={handleChange} placeholder="Search"/>
            <button className="search__button">
                <svg className="search__icon">
                    <use xlinkHref="/images/sprite.svg#icon-magnifying-glass"></use>
                </svg>
            </button>
        </form>
    )
}

export default (Search)
