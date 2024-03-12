import { createBrowserRouter, createRoutesFromElements, redirect, RouterProvider } from 'react-router-dom';
import { Route, Link, NavLink } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Home from './pages/Home';
import VerPelicula from './pages/VerPelicula';
import Perfil from './pages/Perfil';

const datosSimulados = {
    nombre: 'Mac Giver',
    id: 'RT0054AWSA',
    xp: 210,
    bibliografia: 'Hola! Soy Mac Gyver, autentico cineasta de los años 60. Vivi en una casa de campo hasta mis 50 años, ahora me dedico a criticar gente en internet.',
    esAmigo: false,
    esBloqueado: false,
    listasPublicas: [
        {nombre: 'La Toalla del Mojado', id: 'RFRTG31'},
        {nombre: 'Mis Actuaciones de 1971', id: 'RTGAW21'},
        {nombre: 'James Bond', id:'J5B4GG'},
    ]
}

function App() {

    const solicitarDatosUsuario = (id = 0) => {
        // Si no se provee un id, entonces devolver datos del usuario actual. (por cookie?)
        // Quien sea que use esto, debe de estar autenticado.
        if(id == 0) {
            // Datos del usuario.
            return {    // Datos simulados
                id: '4GT70ARR49',
                nombre: 'Kevin Monterrey',
                xp: 100,
                alias: '',
                bibliografia: '',
                usarAlias: true,
                usarPrivacidad: true,
                usuariosBloqueados: [/* {id, nombreUsuario} */],
                idiomaBusqueda: 0,
            }
        } else {
            // Datos del usuario solicitado.
            return {
                nombre: 'Mac Giver',
                id: 'RT0054AWSA',
                xp: 514,
                bibliografia: 'Hola! Soy Mac Gyver, autentico cineasta de los años 60. Vivi en una casa de campo hasta mis 50 años, ahora me dedico a criticar gente en internet.',
                esAmigo: false,
                esBloqueado: false,
                listasPublicas: [
                    {nombre: 'La Toalla del Mojado', id: 'RFRTG31'},
                    {nombre: 'Mis Actuaciones de 1971', id: 'RTGAW21'},
                    {nombre: 'James Bond', id:'J5B4GG'},
                ]
            }
        }
    }


    const router = createBrowserRouter(createRoutesFromElements([
        <Route path='/' element={<LandingPage />} />,
        <Route path='/login' element={<Login />} />,
        <Route path='/registro-temporal' element={<Login version='registro' />} />,
        <Route path='/registro' element={<Login version='vincular' />} />,
        <Route path='/home' element={<Home />} />, /* agregar loader para authenticar usuario y sesion. */
        <Route path='/pelicula/:peliculaId' element={<VerPelicula />} />,
        <Route path='/pelicula' loader={() => redirect('/home') } />,    /* redirecciona al no especificar :peliculaid */
        <Route path='/perfil/:perfilId' element={<Perfil configuracion={false} />} loader={({params}) => solicitarDatosUsuario(params.perfilId)} />,
        <Route path='/perfil' loader={() => redirect('/configuracion')} />,
        // Crear ruta para redireccionar al perfil de usuario si no se encontro id.
        <Route path='/configuracion' element={<Perfil configuracion={true} />} loader={() => solicitarDatosUsuario()} />,

        <Route path='*' element={<ErrorPage />} />
    ]))

    return(
        <RouterProvider router={router} />
    )
}

export default App
