import React, { useState } from 'react'

import MovieCard from "./movieCard.js"

export default function SearchMovies() {

    const [query, setQuery] = useState('')

    const [movies, setMovies] = useState([])

    const searchMovies = async (event) => {
        // prevent page from reloading when Search button clicked
        event.preventDefault();

        const url = `https://api.themoviedb.org/3/search/movie?api_key=8e558513fdee516a6b00a6e0a8eb44f1&language=en-US&query=${query}&page=1&include_adult=false`

        try {
            // fetch and store data from URL
            const response = await fetch(url)
            // convert data into js-readable objects
            const data = await response.json()
            // track which movies should be displayed based on user query
            setMovies(data.results)
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Search for a movie: </label>
                <input 
                    value={query} 
                    type="text" 
                    className="input" 
                    name="query" 
                    placeholder="'i.e. Bridge to Terabithia'" 
                    onChange={(event) => setQuery(event.target.value)}
                />
                <button type="submit" className="button"> Search </button>
            </form>
            <div className="card--list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    )
}
