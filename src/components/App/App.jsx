import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import css from './App.module.css'
import Navigation from '../Navigation/Navigation'
import NotFound from '../../pages/NotFound';
import Loader from "../Loader/Loader";

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));

function App() {

  return (
    <>
      <div className={css.container}>
        <Navigation />

        <Suspense fallback={<Loader/>}>
 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="feedback" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        </Suspense>
      </div>
    </>
  )
}

export default App
