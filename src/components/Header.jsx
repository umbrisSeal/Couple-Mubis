import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Boton from './Boton';
import '../styles/Header.css';
import '../assets/js/niveles.js';
import RuedaXP from './RuedaXP.jsx';
import { obtenerNivel } from '../assets/js/niveles.js';

function Header(props) {
    const [busqueda, setBusqueda] = useState('');
    const [mostrarPerfil, setMostrarPerfil] = useState(false);
    const perfilRef = useRef(null);
    const navigate = useNavigate();

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

    const regresar = () => {
        navigate(-1);   // Sustituto del history.goBack().
    }


    const buscarPeliculas = function() {
        // Solicitud HTTP para solicitar peliculas.
        return;
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

    const datosSimulados3 = {
        usuarioId: 'REVETGILLE',
        imagenPerfil: 'anonimo.png',
        nombreUsuario: 'Kevin Monterrey',
        //nivel: 2, /* Puede ser omitido y calculado en la app para solo guardar el xp. */
        xpTotal: 100,
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
                        <input type='text' id='inputBusqueda' name='inputBusqueda' maxLength={80} value={busqueda} onChange={handleBusquedaChange} placeholder='Buscar pelicula...' className='campo-busqueda'></input>
                        <div className='resultados-busqueda'>
                            <ul id='lista-busqueda'>
                                {datosSimulados.resultados > 0 ? 
                                datosSimulados.peliculas.map((pelicula, index) => {
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
                    <img src={`../src/assets/images/perfiles/${datosSimulados3.imagenPerfil}`} alt='img perfil'  className='imagen-perfil' onClick={handleMostrarPerfilChange} />
                    <div id='contenedor-menu-perfil' className={`${mostrarPerfil ? '' : 'ocultar'}`} >
                        <div className='triangulo'></div>
                        <div className='contenedor-menu'>
                            <h3> {datosSimulados3.nombreUsuario} </h3>
                            <p id='id-usuario'> ID: {datosSimulados3.usuarioId} </p>
                            <hr/>
                            <p id='nivel'> Nivel {obtenerNivel(datosSimulados3.xpTotal).nivel} </p>
                            <p id='nivel-nombre'> {obtenerNivel(datosSimulados3.xpTotal).nombreNivel} </p>
                            <RuedaXP nivel={obtenerNivel(datosSimulados3.xpTotal)} />
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
                    <img src={`../src/assets/images/perfiles/${datosSimulados3.imagenPerfil}`} alt='img perfil' className='imagen-perfil-perfil' />
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