import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import css from './App.module.css'
import AppBar from '../AppBar/AppBar'
import NotFound from '../../pages/NotFound';
import Loader from "../Loader/Loader";

const Home = lazy(() => import('../../pages/Home/Home'));
const Movies = lazy(() => import('../../pages/Movies/Movies'));
const MovieInfo = lazy(() => import('../../pages/MovieInfo/MovieInfo'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieFeedback = lazy(() => import('../MovieFeedback/MovieFeedback'));

function App() {

  return (
    <>
      <div className={css.container}>
        <AppBar />

        <Suspense fallback={<Loader/>}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieInfo />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="feedback" element={<MovieFeedback />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>

        </Suspense>
      </div>
    </>
  )
}

export default App
