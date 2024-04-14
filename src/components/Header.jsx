import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Boton from './Boton';
import '../styles/Header.css';
import '../assets/js/niveles.js';
import RuedaXP from './RuedaXP.jsx';
import { obtenerNivel } from '../assets/js/niveles.js';
import DIRECCIONES from '../assets/js/diccionarioURLs.js';

function Header(props) {
    const [busqueda, setBusqueda] = useState('');
    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const [informacionUsuario, setInformacionUsuario] = useState({});
    const [resultadosBusqueda, setResultadosBusqueda] = useState({});
    const perfilRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {

        const consultarInformacionUsuario = async () => {
            const datos = await fetch(`${DIRECCIONES.BACKEND}/api/usuario`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`
                }
            }).then(response => response.ok ? response.json() : {}).then(data => data).catch(error => {});
    
            setInformacionUsuario(datos);
        };

        consultarInformacionUsuario();
    }, [])

    useEffect(() => {
        // Definir esta funcion handle, para garantizar el tener el valor actualizado de mostarPerfil.
        const handleClickAfuera = (event) => {
            if(perfilRef.current && !perfilRef.current.contains(event.target)) {
                setMostrarPerfil(false);
            }
        }

        if(mostrarPerfil) {
            document.addEventListener('mousedown', handleClickAfuera);
        } else {
            document.removeEventListener('mousedown', handleClickAfuera);
        }


        // Clean-up
        return () => {
            document.removeEventListener('mousedown', handleClickAfuera);
        }
    }, [mostrarPerfil])

    const handleBusquedaChange = (event) => setBusqueda(event.target.value);
    const handleBusquedaEnter = (event) => {if(event.key === 'Enter') buscarPeliculas();};

    const regresar = () => {
        navigate(-1);   // Sustituto del history.goBack().
    }


    const buscarPeliculas = async () => {
        // Solicitud HTTP para solicitar peliculas.
        if(busqueda.length === 0) return;

        const requestBody = {
            parametroBusqueda: busqueda
        };

        try {
            const jsonBody = JSON.stringify(requestBody);
            const resultadosBusqueda = await fetch(`${DIRECCIONES.BACKEND}/api/buscar`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody),
            }).then(response => response.ok ? response.json() : {}).then(data => data).catch(error => {});
    
            setResultadosBusqueda(resultadosBusqueda);

        } catch {
            return;
        }

    }

    const handleMostrarPerfilChange = function() {
        // Cambiar variable de estado para mostrar perfil mini.
        setMostrarPerfil(!mostrarPerfil);
    }

    const tamaño = 'w92';

    const datosSimulados = {
        resultados: 5,
        peliculas: [
            {titulo: 'Tarzan: Rey de los Monos monas', año: '1999', id: '123', urlPoster: 'bTvHlcqiOjGa3lFtbrTLTM3zasY.jpg'},
            {titulo: 'High School Musical', año: '2006', id: '10947', urlPoster: 'bg1eLo2OjySRYKaTO89ZDsqUcJ4.jpg'},
            {titulo: 'Godzilla', año: '2014', id: '124905', urlPoster: 'zokD6uxR2iWfYM3Y84yGJvnNTK7.jpg'},
            {titulo: 'KONOSUBA - God\'s blessing on this wonderful world', año: '2019', id: '532067', urlPoster: 'fv5BgcfkpWh3V6Pb1qVlXESBOdl.jpg'},
            {titulo: 'Rocky II', año: '1979', id: '1367', urlPoster: 'nMaiiu0CzT77U4JZkUYV7KqdAjK.jpg'}
        ]
    }
    const datosSimulados2 = {
        resultados: 0,
        peliculas: []
    }



    return(
        <header className={`${props.version === 'home' ? 'd-flex' : ''}`}>
            <div className={`centrar-vertical invertir-flex sin-fondo cabecera ${props.version === 'login' ? '' : 'ocultar'}`}>
                {/* Version: login, para pagina principal. */}
                <Link to="/login">
                    <Boton version='loginTransparente' />
                </Link>
            </div>

            <div className={`fondo-primario extender-fondo header-home ${props.version === 'home' ? '' : 'ocultar'}`}>
                {/* Version: home */}
                <Link to='/home'>
                    <img src='../src/assets/images/logo.png' className='imagen-logo' />
                </Link>

                <div className='seccion-busqueda'>
                    <button type='button' className='boton-buscar' onClick={buscarPeliculas}>
                        <img src='../src/assets/images/iconos/buscar.png' className='icono-buscar'/>
                    </button>
                    <div className='contenedor-busqueda'>
                        <input type='text' id='inputBusqueda' name='inputBusqueda' maxLength={80} value={busqueda} onChange={handleBusquedaChange} placeholder='Buscar pelicula...' className='campo-busqueda' onKeyUp={handleBusquedaEnter}></input>
                        <div className='resultados-busqueda'>
                            <ul id='lista-busqueda'>
                                {resultadosBusqueda.resultados > 0 ? 
                                resultadosBusqueda.peliculas.map((pelicula, index) => {
                                    return (
                                        <li key={pelicula.id}>
                                            <Link to={`/pelicula/${pelicula.id}`} className='link-busqueda'>
                                                <div>
                                                    <img src={`https://image.tmdb.org/t/p/${tamaño}/${pelicula.urlPoster}`} />
                                                </div>
                                                <div>
                                                    <p className='titulo-pelicula-busqueda'>
                                                        {pelicula.titulo.length < 30 ? pelicula.titulo : pelicula.titulo.substring(0, 29) + '...'}
                                                    </p>
                                                    <p className='año-pelicula-busqueda'> {pelicula.año} </p>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })
                                :
                                <li>
                                    <p className='centrar-texto'> No hay resultados. </p>
                                </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <button type='button' className='boton-perfil' ref={perfilRef}>
                    <img src={`../src/assets/images/perfiles/${informacionUsuario.imagenPerfil}`} alt='img perfil'  className='imagen-perfil' onClick={handleMostrarPerfilChange} />
                    <div id='contenedor-menu-perfil' className={`${mostrarPerfil ? '' : 'ocultar'}`} >
                        <div className='triangulo'></div>
                        <div className='contenedor-menu'>
                            <h3> {informacionUsuario.nombreUsuario} </h3>
                            <p id='id-usuario'> ID: {informacionUsuario.usuarioId} </p>
                            <hr/>
                            <p id='nivel'> Nivel {obtenerNivel(informacionUsuario.xpTotal).nivel} </p>
                            <p id='nivel-nombre'> {obtenerNivel(informacionUsuario.xpTotal).nombreNivel} </p>
                            <RuedaXP nivel={obtenerNivel(informacionUsuario.xpTotal)} />
                            <hr/>
                            <Link to='/configuracion' className='no-hypervinculo' >
                                <h4> Configuración de Perfil </h4>
                            </Link>
                            <hr/>
                            <Link to='/logout' className='no-hypervinculo' >
                                <h4> Cerrar Sesion </h4>
                            </Link>
                        </div>
                    </div>
                </button>

            </div>

            <div className={`${props.version === 'perfil' ? '' : 'ocultar'} header-perfil`}>
                <div className='contenedor-header-perfil fondo-perfil-superior'>
                    <button className='boton-header-volver' onClick={regresar}> &lt; Regresar </button>
                </div>
                <div className='contenedor-header-perfil fondo-perfil-inferior'>
                    <img src={`../src/assets/images/perfiles/${informacionUsuario.imagenPerfil}`} alt='img perfil' className='imagen-perfil-perfil' />
                    <div className={`configuracion-imagen-perfil-perfil ${props.configuracion ? '' : 'ocultar'}`}>
                        <img src='../src/assets/images/iconos/editar.png' alt='Imagen editar' width={25} />
                        <p> Editar </p>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header