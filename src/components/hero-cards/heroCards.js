import React from 'react';

const HeroCards = props => {

    return (
        <div className="row mb2">
            {!props.ppl ? <div>Loading...</div> :
                props.items.map(({ id, name, height, mass, gender, homeworld }) => {
                    return (
                        <div key={id} className="col-md-6">

                            <div className="item-details card">
                                <img className="item-image"
                                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                                    alt='xexe)' />
                                <div className="card-body">
                                    <h4>{name}</h4>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <span className="term">height</span>
                                            <span>{height}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <span className="term">mass</span>
                                            <span>{mass}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <span className="term">gender</span>
                                            <span>{gender}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <span> homeworld: {
                                                homeworld.includes(props.home) ? <span>Loading...</span> : homeworld
                                            } </span>
                                        </li>
                                        <li className="list-group-item">
                                            <button onClick={() => props.addFav({ name, id })} className='btn'> ♥️
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default HeroCards
