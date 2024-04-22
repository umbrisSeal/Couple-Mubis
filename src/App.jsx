import { createBrowserRouter, createRoutesFromElements, redirect, RouterProvider} from 'react-router-dom';
import { Route, Link, NavLink } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Home from './pages/Home';
import VerPelicula from './pages/VerPelicula';
import Perfil from './pages/Perfil';
import VerLista from './pages/VerLista';

import DIRECCIONES from './assets/js/diccionarioURLs';


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

    async function autenticar() {
        // Autentica al usuario, retorna un boleano como resultado.
        const auth = await fetch(`${DIRECCIONES.BACKEND}/api/${DIRECCIONES.AUTH}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`
            }
        }).then(response => response.ok).catch(error => false);

        return auth;
    }

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
                usarAlias: false,
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

    const verListaLoader = async (listaID) => {
        // Solicitud para datos lista.
        // http://localhost:3000/api/lista/:listaID
        const auth = await autenticar();
        console.log("Auntenticado? ", auth);
        if(!auth) return redirect('/login');

        const datosLista = await fetch(`${DIRECCIONES.BACKEND}/api/lista/${listaID}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND_TEST}`
            }
        }).then(response => response.ok ? response.json() : {}).then(data => data).catch(error => {});

        return datosLista;
    }

    async function landingPageLoader() {
        const auth = await autenticar();
        return auth ? redirect('/home') : null;
    }

    async function homeLoader() {

        /*
            Todo el async-await no es necesario, se puede invocar la funcion regular en el loader. Sin embargo, no podra usar array destructuring para el Promise.all y tendra que retornar el Promise directamente... aunque no estoy seguro si se esta esperando a tener una respuesta ANTES de renderizar el componente. De cualquier caso, la respuesta SI llega al componente. Usando el await si garantiza que el componente no se renderize hasta que se complete este promise.
        */

        // Verifica que aun este autenticado el usuario, si no, mandalo a reautenticar.
        const auth = await autenticar();
        if(!auth) return redirect('/login');

        const [ peliculasRecomendadas, listasUsuario ] = await Promise.all(
            [
                fetch(`${DIRECCIONES.BACKEND}/api/pelicula`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`
                    }
                }).then(response => response.json()).then(data => data).catch(error => []),

                fetch(`${DIRECCIONES.BACKEND}/api/usuario/listas`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`
                    }
                }).then(response => response.json()).then(data => data).catch(error => {}),

            ]
        )
        .then((responses) => responses);


        return {
            peliculasRecomendadas,
            listasUsuario,
        };
    }

    const peliculaLoader = async (peliculaID) => {
        // Solicitar datos de la pelicula.
        // http://localhost:3000/api/pelicula/:peliculaID

        const auth = await autenticar();
        if(!auth) return redirect('/login');

        const datosPelicula = await fetch(`${DIRECCIONES.BACKEND}/api/pelicula/${peliculaID}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`
            }
        }).then(response => response.ok ? response.json() : {}).then(data => data).catch(error => {});

        return datosPelicula;
    }

    const loginLoader = async () => {
        const auth = await autenticar();
        if(auth) return redirect('/home');
        return 0;
    }


    const router = createBrowserRouter(createRoutesFromElements([
        <Route path='/' element={<LandingPage />} loader={async () => await landingPageLoader()} />,
        <Route path='/login' element={<Login />} loader={async () => await loginLoader()} />,
        <Route path='/registro-temporal' element={<Login version='registro' />} loader={async () => await loginLoader()} />,
        <Route path='/registro' element={<Login version='vincular' />} loader={async () => await loginLoader()} />,
        <Route path='/home' element={<Home />} loader={async() => await homeLoader()} />,
        <Route path='/pelicula/:peliculaId' element={<VerPelicula />} loader={async({params}) => await peliculaLoader(params.peliculaId)} />,
        <Route path='/pelicula' loader={() => redirect('/home') } />,    /* redirecciona al no especificar :peliculaid */
        <Route path='/perfil/:perfilId' element={<Perfil configuracion={false} />} loader={({params}) => solicitarDatosUsuario(params.perfilId)} />,
        <Route path='/perfil' loader={() => redirect('/configuracion')} />,
        // Crear ruta para redireccionar al perfil de usuario si no se encontro id.
        <Route path='/configuracion' element={<Perfil configuracion={true} />} loader={() => solicitarDatosUsuario()} />,
        <Route path='/lista/:listaId' element={<VerLista />} loader={async ({params}) => await verListaLoader(params.listaId)} />,
        <Route path='/lista' loader={() => redirect('/home')} />,

        <Route path='*' element={<ErrorPage />} />
    ]))

    return(
        <RouterProvider router={router} />
    )
}

export default App
