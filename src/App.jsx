import {useEffect, useState} from "react"
import MovieForm from './components/MovieForm'
import Movies from './components/Movies'
import './App.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function App() {

  //const movieUrl ="http://localhost:5000/api/movies"
  const movieUrlAlternative = "https://api-movies-list.onrender.com/api/movies"
  const [name, SetName] = useState("")
  const [plataform, setPlataform] = useState("")
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [randomMovie, setRandomMovie] = useState({})
  //const [moviePlataformCreate, SetMoviePlataformCreate] = useState("")

  const getMovies = () => {
    fetch(movieUrlAlternative)
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
    await axios.post(movieUrlAlternative, newMovie)
  }catch(err){
    console.log(err)
  }
  SetName("")
  setPlataform("")
  
  getMovies()

}

const handleDelete = async(id) => {
  console.log(id)
  try{
    await axios.delete(`${movieUrlAlternative}/${id}`)
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
      <span>{name}</span><span>{plataform}</span>
      <MovieForm
        name={name}
        createMovie={createMovie}
        value={name}
        handleInputChange={handleInputChange}
        handleOptionChange={handleOptionChange}
      />
      {loading && <h3>Cargando...</h3>}
      <span>{randomMovie.name} - {randomMovie.plataform}</span>
      <Button variant="warning" onClick={searchRandomMovie}>Random Movie to watch...</Button>
      <table>
        {!loading && <>

          {movies.map((movie, idx) => <Movies 
                                        key={movie._id} 
                                        number={idx + 1} 
                                        name={movie.name} 
                                        plataform={movie.plataform}
                                        handleDelete={() => handleDelete(movie._id)}
                                        />)}
          </>
        }
      </table>
    </div>
  )
}

export default App
