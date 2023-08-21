import {useEffect, useState} from "react"
import MovieForm from './MovieForm'
import Movies from './Movies'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { Button } from 'react-bootstrap';
import Loading from "./Loading";
import {movieApi, movieApiHost} from "../utils/contast"

function MovieContainer() {

    const [name, SetName] = useState("")
    const [plataform, setPlataform] = useState("")
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [randomMovie, setRandomMovie] = useState({})

    const getMovies = () => {
        fetch(movieApi)
        .then(res => res.json())
        .then(data => {
        console.log(data)
        setMovies(data)
        })
        .catch(err => console.log(err))
        .finally(setLoading(false))
    }

    useEffect(() => {
        getMovies()
    },[])
    

    const handleInputChange = (e) => {
    const inputName = e.target.value
    SetName(inputName)

    }
    const handleOptionChange = (e) => {
    const inputPlataform = (e.target.value)
    setPlataform(inputPlataform)
    }

    const createMovie = async (e) => {
    e.preventDefault()
    if(name === "" || plataform === ""){
        return toast.error("Empty Input Field")
    }
    const newMovie = {name:name, plataform: plataform} 
    console.log({name:name, plataform: plataform})
    
    try{
        await axios.post(movieApi, newMovie)
    }catch(err){
        console.log(err)
    }
    SetName("")
    
    getMovies()

    }

    const handleDelete = async(id) => {
    console.log(id)
    try{
        await axios.delete(`${movieApi}/${id}`)
        getMovies()
    }catch(err){
        console.log(err)
    }
    }

    const searchRandomMovie = () => {
        const randomNumber = Math.random() * movies.length
        console.log(randomNumber.toFixed(0))
        const randonMovieSelect = randomNumber.toFixed(0)
        const movieChoose = movies[randonMovieSelect]
        setRandomMovie(movieChoose)
    }

    return (
        <div className="d-flex justify-content-center align-items-center flex-column gap-4">
        <h4>Movie Manager</h4>
        <MovieForm
            name={name}
            createMovie={createMovie}
            value={name}
            handleInputChange={handleInputChange}
            handleOptionChange={handleOptionChange}
        />
        {loading && <Loading />}
        {!loading && <>
            <span>{randomMovie.name} - {randomMovie.plataform}</span>
            <Button variant="warning" onClick={searchRandomMovie}>Random Movie to watch...</Button>
            <table>
                {!loading && <>

                {movies.map((movie, idx) => <Movies 
                                                id={movie._id}
                                                key={movie._id} 
                                                number={idx + 1} 
                                                name={movie.name} 
                                                plataform={movie.plataform}
                                                handleDelete={() => handleDelete(movie._id)}
                                                />)}
                </>
                }
            </table>
        </>}
        </div>
    )
}

export default MovieContainer
