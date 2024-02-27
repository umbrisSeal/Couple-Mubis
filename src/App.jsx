import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Route, Link, NavLink } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';



function App() {

    const router = createBrowserRouter(createRoutesFromElements([
        <Route path='/' element={<LandingPage />} />,

        <Route path='*' element={<ErrorPage />} />
    ]))

    return(
        <RouterProvider router={router} />
    )
}

export default App
