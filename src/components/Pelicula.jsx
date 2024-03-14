import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Pelicula.css';
import Boton from './Boton';

function Pelicula({pelicula, version, handleVistaChange, indexPelicula}) {
    const [vista, setVista] = useState(pelicula?.vista || false);

    if(!pelicula || !version) return <p> Error: Debe de enviar una pelicula y la version como prop. </p>

    const tamaño = 'w342';
    const handleBotonChange = () => {
        handleVistaChange(indexPelicula);
        setVista(!vista);
    }

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
            {version == 'enLista' && handleVistaChange ? 
                <div className='contenedor-pelicula-botones'>
                    <Boton version='peliculaVer' vista={vista} handleBotonChange={handleBotonChange} />
                    <Boton version='peliculaBorrar' />
                </div>
                : 
                <Fragment></Fragment>
            }
        </div>
    )
}

export default Pelicula

/*
    pelicula = {
        titulo,
        año,
        urlPoster,
        id,
        vista (bool, solo cuando version enLista.)
    }

    Para version guardada, para mostrar enLista.
    Para version guardada debe de proveer una funcion handleVistaChange.

*/