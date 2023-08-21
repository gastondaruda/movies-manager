import { Button,Form } from 'react-bootstrap';

const MovieForm = ({createMovie,name,handleInputChange, handleOptionChange}) => {

    return (
        <Form onSubmit={createMovie}>
            <Form.Group className="mb-3">
                <Form.Label>Name movie</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Add a movie..." 
                    name={name}
                    value={name}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Movie plataform</Form.Label>
                <Form.Select aria-label="Default select example" onChange={handleOptionChange}>
                    <option>Choose plataform</option>
                    <option value="Netflix">Netflix</option>
                    <option value="Amazon Prime">Amazon Prime</option>
                    <option value="Hbo Max">Hbo Max</option>
                </Form.Select>
            </Form.Group>
    
            <Button variant="success" type="submit" className="w-100">Add Movie</Button>
        </Form>  
)   
}

export default MovieForm
