import { createBrowserRouter, createRoutesFromElements, redirect, RouterProvider } from 'react-router-dom';
import { Route, Link, NavLink } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Home from './pages/Home';
import VerPelicula from './pages/VerPelicula';
import Perfil from './pages/Perfil';


function App() {

    const router = createBrowserRouter(createRoutesFromElements([
        <Route path='/' element={<LandingPage />} />,
        <Route path='/login' element={<Login />} />,
        <Route path='/registro-temporal' element={<Login version='registro' />} />,
        <Route path='/registro' element={<Login version='vincular' />} />,
        <Route path='/home' element={<Home />} />, /* agregar loader para authenticar usuario y sesion. */
        <Route path='/pelicula/:peliculaId' element={<VerPelicula />} />,
        <Route path='pelicula' loader={() => redirect('/home') } />,    /* redirecciona al no especificar :peliculaid */
        <Route path='perfil/:perfilId' element={<Perfil />} />,
        // Crear ruta para redireccionar al perfil de usuario si no se encontro id.

        <Route path='*' element={<ErrorPage />} />
    ]))

    return(
        <RouterProvider router={router} />
    )
}

export default App
