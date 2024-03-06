import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Route, Link, NavLink } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Home from './pages/Home';



function App() {

    const router = createBrowserRouter(createRoutesFromElements([
        <Route path='/' element={<LandingPage />} />,
        <Route path='/login' element={<Login />} />,
        <Route path='/registro-temporal' element={<Login version='registro' />} />,
        <Route path='/registro' element={<Login version='vincular' />} />,
        <Route path='/home' element={<Home />} />, /* agregar loader para authenticar usuario y sesion. */

        <Route path='*' element={<ErrorPage />} />
    ]))

    return(
        <RouterProvider router={router} />
    )
}

export default App
