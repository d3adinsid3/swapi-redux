import React from 'react'


const Favs = (props) => {

    return (
        <>
            <div className="float-right">
                <button onClick={() => {
                    localStorage.clear()
                    props.setFavs([])
                }}
                        className='btn btn-primary'>
                    clear list
                </button>
            </div>
            <h1>My favourite heroes:</h1>

            {typeof localStorage['favors'] == "undefined" ? null :
                JSON.parse(window.localStorage.getItem('favors')).map(({id, name}) => {
                    return (
                        <ul key={id}>
                            <li>{name}</li>
                        </ul>
                    )
                })

            }
        </>
    )
}
export default Favs