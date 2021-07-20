import { GET_DATA } from './types'

const getPlanet = async (url) => {
    const res = await fetch(`${url}`)
    const resjs = await res.json()
    return await resjs.name
}

const home = 'https://swapi.dev/api/planets'

// const makeArray = () => {
//     let id = 1
//     let arr0 = []

//     while (id < 10) {
//         arr0.push(`https://swapi.dev/api/people/?page=${id}`)
//         id++
//     }

//     return arr0
// }

export const getPPL = () => async (dispatch) => {

    let id = 1
    let arr = []
    

    while (id < 10) {
        await fetch(`https://swapi.dev/api/people/?page=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw Error('не загрузились')
                }
                return response.json()
            })
            .then(data => {
                arr.push(data.results.map(_transformPerson))
            })
        id++
    }
      await  Promise.all(
        arr.flat().filter(item => item.homeworld.includes(home))
            .map(async el => {
                el.homeworld = await getPlanet(el.homeworld)
            }))

    dispatch({ type: GET_DATA, payload: arr })
}


const _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/
    return item.url.match(idRegExp)[1]
}


const _transformPerson = (person) => {
    return {
        id: _extractId(person),
        name: person.name,
        height: person.height,
        mass: person.mass,
        gender: person.gender,
        homeworld: person.homeworld
    }
}
