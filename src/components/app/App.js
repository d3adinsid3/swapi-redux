import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react'
import GendFilter from "../gendfilter/GendFilter";
import Pagination from "../pagination/pagination";
import SearchItems from "../search-items/search-items";
import Favs from '../favs/Favs'
import { useDispatch, useSelector } from 'react-redux';
import { getPPL } from "../../actions/actions";
import HeroCards from "../hero-cards/heroCards";

const App = () => {

    const [ppl, setPpl] = useState(false)
    const [page, setPage] = useState(1)
    const [itemFilter, setItemFilter] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [favs, setFavs] = useState([])
    const [postsPerPage] = useState(10);

    const dispatch = useDispatch()

    const items = useSelector(state => state.items.items).flat()

    const home = 'https://swapi.dev/api/planets'

    useEffect(() => {
        dispatch(getPPL())
        setPpl(!ppl)
    }, [])


    const filter = (items, filter) => {
        switch (filter) {
            case 'male':
                return items.filter((item) => item.gender === "male")

            case 'female':
                return items.filter((item) => item.gender === "female")

            case '':
                return items

            default:
                return items
        }
    }

    const onFilterChange = (filter) => {
        setItemFilter(filter)
    }

    const search = (items, searchInput) => {
        if (searchInput.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.name
                .toLowerCase()
                .indexOf(searchInput.toLowerCase()) > -1
        })
    }

    const onLabelChange = (searchInput) => {
        setSearchInput(searchInput)
    }

    const addFav = favorite => {
        if (!favs.some(alreadyFavorite => alreadyFavorite.name === favorite.name)) {
            setFavs(
                [...favs, { name: favorite.name, id: favorite.id }]
            )
            window.localStorage.setItem('favors', JSON.stringify([...favs, { name: favorite.name, id: favorite.id }]))
        }

    };

    const indexOfLastPost = page * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage

    const visibleItemsToPaginate = filter(search(items, searchInput), itemFilter)
    const visibleItems = filter(search(items, searchInput), itemFilter).slice(indexOfFirstPost, indexOfLastPost)
    const paginate = number => setPage(number)


    return (
        <>

            <Router>
                <div className="links">
                    <Link to="/best">to best </Link>
                    <Link to="/">home</Link>
                </div>
                <Route path="/best" exact> <Favs favs={favs} setFavs={setFavs} /> </Route>

                <Route path="/" exact>

                    <Pagination paginate={paginate}
                        visibleItems={visibleItems}
                        items={visibleItemsToPaginate}
                        ppl={ppl}
                        postsPerPage={postsPerPage} />

                    <SearchItems onLabelChange={onLabelChange} />

                    <GendFilter filter={filter}
                        onFilterChange={onFilterChange} />

                    <HeroCards items={visibleItems}
                        addFav={addFav}
                        ppl={ppl}
                        home={home} />

                </Route>
            </Router>
        </>
    )

}

export default App;
