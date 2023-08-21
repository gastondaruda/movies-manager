import { useState,useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import {Form, Button} from 'react-bootstrap/';
import {movieApi, movieApiHost} from "../utils/contast"


const MovieDetail = () => {
    const [loading, setLoading] = useState(true)
    const [movieFind, setMovieFind] = useState({})
    const [newName, setNewName] = useState("")
    const [newPlataform, setNewPlataform] = useState("")
    const {id} = useParams()

    const searchById = async () => {
        fetch(`${movieApi}${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data._id)
            setMovieFind(data)
            setNewName(data.name)
            setNewPlataform(data.plataform)
        })
        .catch(err => console.log(err))
        .finally(setLoading(false))
    }


    useEffect(() => {
        searchById()
    },[])


    const handleInputChange = (e) => {
        setNewName(e.target.value)
    }
    const handleInputChangePlataform = (e) => {
        setNewPlataform(e.target.value)
    }

    const update = async() => {

        const updateMovie = {name: newName, plataform: newPlataform}

        try{
            console.log("updating...")
            await axios.patch(`${movieApi}${movieFind._id}`, updateMovie)
        }catch(err){
            console.log(err)
        }
    }


    return (
        <>
            {loading && <h3>Cargando....</h3>}
            {!loading && <Form className="form-container">
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="inputPassword5">Movie</Form.Label>
                                <Form.Control  type="text" placeholder={movieFind.name} value={newName} onChange={handleInputChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Movie plataform</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={handleInputChangePlataform}>
                                    <option>Choose plataform</option>
                                    <option value="Netflix">Netflix</option>
                                    <option value="Amazon Prime">Amazon Prime</option>
                                    <option value="Hbo Max">Hbo Max</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant="primary" className="w-100" onClick={update}>Update...</Button>
                            <Link to="/">
                                <Button variant="success" className="w-100">Home</Button>
                            </Link>
                        </Form>}
        </>
    )
}

export default MovieDetail
