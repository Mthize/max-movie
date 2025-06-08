import React, { useEffect, useState } from 'react'
import { Search } from "./assets/components/Search.jsx";
import Spinner from "./assets/components/spinner.jsx";
import MovieCard from "./assets/components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { updateSearchCount } from './appwrite.js'

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

    useEffect(() => {
        setErrorMessages('Error fetching movies. Please try again later.');
        fetchMovies(debounceSearchTerm);
    }, [debounceSearchTerm]);

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessages('');
        try {
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const data = await response.json();

            if (data.Response === 'False') {
                setErrorMessages(data.Error || 'Something went wrong');
                setMovieList([]);
                return;
            }

            setMovieList(data.results || []);

            if(query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }
        } catch (error) {
            console.log(`Error fetching movies: ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main>
            <div className="pattern" />

            <div className="wrapper">
                <header>
                    <img src="./hero.png" alt="Hero Banner" />
                    <h1>
                        One Place To Find Your Favoureite
                        <span className="text-gradient"> Movies</span> Without A Hassle
                    </h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className="all-movies">
                    <h2 className="mt-[40px]">All Movies</h2>

                    {isLoading ? (
                        <Spinner />
                    ) : errorMessages ? (
                        <p className="text-red-500">{errorMessages}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    )
}

export default App
