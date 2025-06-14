import React from 'react'

export const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search">
            <div>
                <img src="./search.svg" alt="Search Icon"/>

                <input type="text"
                       placeholder="Search Movies and More"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}
