import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Boton from './Boton';
import '../styles/Header.css';
import '../assets/js/niveles.js';

function Header(props) {
    const [busqueda, setBusqueda] = useState('');

    const handleBusquedaChange = (event) => setBusqueda(event.target.value);

    const buscarPeliculas = function() {
        // Solicitud HTTP para solicitar peliculas.
        return;
    }
    const mostrarPerfil = function() {
        // Cambiar variable de estado para mostrar perfil mini.
        return;
    }

    const tamaño = 'w92';

    // Debe ir contenido como estado, para detectar cambios.
    /*
        Contiene link de poster, titulo, año y id (oculto).
        Oculta el titulo de la pelicula si excede el length X, en dado caso sustituye a "..."
        El objeto tambien contiene el numero de resultados a mostrar, si no hay resultados entonces se
        muestra el error "no hay resultados".
        Tambien se muestra un loader cuando se manda a llamar la solicitud.
    */
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
        nivel: 2,
        xp: 134
    }
    



    return(
        <header className={`${props.version === 'home' ? 'd-flex' : ''}`}>
            <div className={`centrar-vertical invertir-flex sin-fondo cabecera ${props.version === 'login' ? '' : 'ocultar'}`}>
                <Link to="/login">
                    <Boton version='loginTransparente' />
                </Link>
            </div>

            <div className={`fondo-primario extender-fondo header-home ${props.version === 'home' ? '' : 'ocultar'}`}>
                <Link to='/home'>
                    <img src='src\assets\images\logo.png' className='imagen-logo' />
                </Link>

                <div className='seccion-busqueda'>
                    <button type='button' className='boton-buscar' onClick={buscarPeliculas}>
                        <img src='src\assets\images\iconos\buscar.png' className='icono-buscar'/>
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

                <button type='button' className='boton-perfil' onClick={mostrarPerfil}>
                    <img src={`src/assets/images/perfiles/${datosSimulados3.imagenPerfil}`} alt='img perfil'  className='imagen-perfil' />
                    <div id='contenedor-menu-perfil'>
                        <div className='triangulo'></div>
                        <div className='contenedor-menu'>
                            <h3> {datosSimulados3.nombreUsuario} </h3>
                            <p id='id-usuario'> ID: {datosSimulados3.usuarioId} </p>
                            <hr/>
                            <p id='nivel'> Nivel {datosSimulados3.nivel} </p>
                            <p id='nivel-nombre'> Aqui va el nombre del nivel. </p>
                            <div>
                                <p> Aqui va la rueda de progreso. </p>
                                <p> Quizas esto deberia de ser un componente. </p>
                            </div>
                            <hr/>
                            <Link to='/configuracion' className='no-hypervinculo'>
                                <h4> Configuración de Perfil </h4>
                            </Link>
                            <hr/>
                            <Link to='/logout' className='no-hypervinculo'>
                                <h4> Cerrar Sesion </h4>
                            </Link>
                        </div>
                    </div>
                </button>

            </div>

        </header>
    )
}

export default Header

/*

<Link to="/login">
            <button type='button' className='boton bordeado-amarillo'> Login </button>
        </Link>


        texto 941B0C 941B0C

<input type='text' id='usuario' name='usuario' maxLength={50} placeholder='Usuario o email' className={`entrada ${version === 'vincular' ? 'ocultar' : ''}`} value={user} onChange={handleUserChange} />


*/