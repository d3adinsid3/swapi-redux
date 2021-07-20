import React from 'react'
import {useState} from 'react'

const GendFilter = (props) => {

    const [buttonss, setButtonss] = useState([
        {name: 'male', label: 'male'},
        {name: 'female', label: 'female'},
        {name: '', label: 'clear filter'}
    ])

    const buttons = buttonss.map(({name, label}) => {
        const isActive = props.filter === name;
        const clazz = isActive ? 'btn-info' : 'btn btn-primary'
        return (<button type="button"
                        className={`btn ${clazz}`}
                        key={name}
                        onClick={() => props.onFilterChange(name)}>
                {label}
            </button>

        );
    });

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}
export default GendFilter