import {HashRouter, Route, Routes} from "react-router-dom"
import MovieContainer from './components/MovieContainer';
import MovieDetail from "./components/MovieDetail";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
return(
  <HashRouter>
    <Routes>
      <Route path="/" element={<MovieContainer />} />
      <Route path="/movieUpdate/:id" element={<MovieDetail />}/>
    </Routes>
  </HashRouter>
)
  
}

export default App
