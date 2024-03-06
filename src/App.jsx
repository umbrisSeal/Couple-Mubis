import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Route, Link, NavLink } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';



function App() {

    const router = createBrowserRouter(createRoutesFromElements([
        <Route path='/' element={<LandingPage />} />,
        <Route path='/login' element={<Login />} />,
        <Route path='/registro-temporal' element={<Login version='registro' />} />,
        <Route path='/registro' element={<Login version='vincular' />} />,

        <Route path='*' element={<ErrorPage />} />
    ]))

    return(
        <RouterProvider router={router} />
    )
}

export default App
