import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import Details from '../MovieDetails/MovieDetails';


function App() {

  return ( 
    //Routes for different pages of the application
    <div className="App">
      <Router> 
        <Route path="/" exact>
          <MovieList />
        </Route>
       <Route exact path='/api/movie/details/:id'>
        <Details />
        </Route> 
      </Router>
    </div>
  );
}


export default App;
