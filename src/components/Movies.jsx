import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';

const Movies = ({id,number, name, plataform, handleDelete}) => {
    const notify = () => toast("updating...!");


    return (
        <tr>
            <td>{number}</td>
            <td className="font-weight-bold">{name}</td>
            <td>{plataform}</td>
            <td>
                <Link to={`/movieUpdate/${id}`}>
                    <Button variant="success" onClick={notify}>Update</Button>
                </Link>
            </td>
            <td>    
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </td>
            <ToastContainer
                autoClose={2000}
            />
        </tr>
    )
}

export default Movies
