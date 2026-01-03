import { Routes, Route } from 'react-router-dom';
import NavBar from './layout/navbar.jsx';
import LoginPage from './users/login.jsx';
import RegisterPage from './users/register.jsx';
import AccountPage from './users/account.jsx';
import MoviesPage from './movies/movies.jsx';
import HomePage from './home/homePage.jsx';
import GenresList from './genres/Genres.jsx';
import ReviewsTab from './reviews/reviews.jsx';
import FavoritesTab from './users/favorites.jsx';
import MovieDetails from './movies/movieDetails.jsx';
import './App.css'

export default function App(){

  return(
    <>
    <NavBar />
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/movies" element={<MoviesPage/>}/>
        <Route path="/movies/:id" element={<MovieDetails/>}/>
        <Route path="/genres" element={<GenresList/>}/>
        <Route path="/reviews" element={<ReviewsTab/>}/>
        <Route path="/favorites" element={<FavoritesTab/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/account" element={<AccountPage/>}/>


      </Routes>
    
    </>
  );
}
