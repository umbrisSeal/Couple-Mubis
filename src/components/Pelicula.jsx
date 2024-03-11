import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Pelicula.css';
import Boton from './Boton';

function Pelicula({pelicula, version}) {

    if(!pelicula || !version) return <p> Error: Debe de enviar una pelicula y la version como prop. </p>

    const tamaño = 'w342';

    return (
        <div className='contenedor-pelicula'>
            <div className='contenedor-pelicula-poster' >
                <img src={`https://image.tmdb.org/t/p/${tamaño}/${pelicula.urlPoster}`} className='pelicula-poster' />
                <Link to={`/pelicula/${pelicula.id}`} className='no-hypervinculo darkener-pelicula-poster'>
                    <div className='darkener-pelicula-contenido'>
                        <h4> {pelicula.titulo} </h4>
                        <p> {`(${pelicula.año})`} </p>
                    </div>
                    <div className='darkener-pelicula-boton'>
                        <Boton version='verPelicula' />
                    </div>
                </Link>
            </div>
            <div className={`contenedor-pelicula-botones ${version == 'guardada' ? '' : 'ocultar'}`}>
                <p> Soy el contenedor botones </p>
            </div>
        </div>
    )
}

export default Pelicula

/*
"w342"
<img src={`https://image.tmdb.org/t/p/${tamaño}/${pelicula.urlPoster}`} className='pelicula-poster' />

<div className='pipip'> Soy oscurecedor </div>


*/