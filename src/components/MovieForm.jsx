import { Button } from 'react-bootstrap';

const MovieForm = ({createMovie,name,handleInputChange, handleOptionChange}) => {

    return (
        <form onSubmit={createMovie}>
            <label>Name movie:</label>
            <input 
                type="text"     
                placeholder="Add a Movie..."
                name={name}
                value={name}
                onChange={handleInputChange}
            />
            <label>Plataforma</label>
            <select onChange={handleOptionChange}>
            <option value="" selected disabled hidden>Choose here</option>
                <option value="Netflix">Netflix</option>
                <option value="Amazon Prime">Amazon Prime</option>
                <option value="Hbo Max">Hbo Max</option>
            </select>
            <Button variant="success" type="submit">Add</Button>
        </form>  
)   
}

export default MovieForm
