import './App.css';
import MovieApp from './MovieApp';
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import Movie from './movie';

const App = () => {

  const movieData = {
    title: "Your Movie Title",
    description: "Description of your movie.",
    trailerUrl: "https://www.youtube.com/watch?v=4GPvYMKtrtI"
  };
  return (
    <div className="App">
      <MovieApp></MovieApp>
      <Movie title={movieData.title}
        description={movieData.description}
        trailerUrl={movieData.trailerUrl}/>
    </div>
  );
}

export default App;
