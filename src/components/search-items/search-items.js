import React from 'react';
import {useState} from 'react';


const SearchItems = props =>{

    const [searchInput, setSearchInput] = useState('')

    const onLabelChange = (e) => {
        const searchInput =  e.target.value
        setSearchInput(searchInput)
        props.onLabelChange(searchInput)
    }

    return(
        <input type="text"
               className="form-control search-input"
               placeholder="type to search"
               onChange={onLabelChange}
               value={searchInput}
        />
    )
}
export default SearchItems