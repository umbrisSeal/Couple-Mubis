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

    const perfilLoader = async (id = null) => {
        const auth = await autenticar();
        if(!auth) return redirect('/login');
        if(id) {
            try {
                const datosUsuario = await fetch(`${DIRECCIONES.BACKEND}/api/perfil`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({idSolicitado: id})
                }).then(response => response.json()).then(data => data).catch(error => {});
                return datosUsuario;
            } catch {
                return {};
            }
        } else {
            const datosUsuario = await fetch(`${DIRECCIONES.BACKEND}/api/perfil`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                }
            }).then(response => response.json()).then(data => data).catch(error => {});
            return datosUsuario;
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
        ).then((responses) => responses);

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

        const numerosRegex = /^[0-9]+$/;
        if(!numerosRegex.test(peliculaID)) {
            throw new Response("Not Found", { status: 404 });
        }

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
        <Route path='/' element={<LandingPage />} loader={async () => await landingPageLoader()} errorElement={<ErrorPage />} />,
        <Route path='/login' element={<Login />} loader={async () => await loginLoader()} errorElement={<ErrorPage />} />,
        <Route path='/registro-temporal' element={<Login version='registro' />} loader={async () => await loginLoader()} errorElement={<ErrorPage />} />,
        <Route path='/registro' element={<Login version='vincular' />} loader={async () => await loginLoader()} />,
        <Route path='/home' element={<Home />} loader={async() => await homeLoader()} errorElement={<ErrorPage />} />,
        <Route path='/pelicula/:peliculaId' element={<VerPelicula />} loader={async({params}) => await peliculaLoader(params.peliculaId)} errorElement={<ErrorPage error={404} />} />,
        <Route path='/pelicula' loader={() => redirect('/home') } errorElement={<ErrorPage />} />,
        <Route path='/perfil/:perfilId' element={<Perfil configuracion={false} />} loader={({params}) => perfilLoader(params.perfilId)} errorElement={<ErrorPage error={404} />} />,
        <Route path='/perfil' loader={() => redirect('/configuracion')} errorElement={<ErrorPage />} />,
        // Crear ruta para redireccionar al perfil de usuario si no se encontro id.
        <Route path='/configuracion' element={<Perfil configuracion={true} />} loader={() => perfilLoader()} errorElement={<ErrorPage />} />,
        <Route path='/lista/:listaId' element={<VerLista />} loader={async ({params}) => await verListaLoader(params.listaId)} errorElement={<ErrorPage error={404} />} />,
        <Route path='/lista' loader={() => redirect('/home')} errorElement={<ErrorPage />} />,

        <Route path='*' element={<ErrorPage error={404} />} />
    ]))

    return(
        <RouterProvider router={router} />
    )
}

export default App
