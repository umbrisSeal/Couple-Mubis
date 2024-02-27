import React, { Fragment } from 'react'
import PeliculaCarrete from './PeliculaCarrete';
import '../styles/CarretePeliculas.css';

function CarretePeliculas() {

    // Solicitar 8 peliculas aleatorias para extraer sus posters y presentarlas en un carrete animado.
    // Se debe de enviar como prop un arreglo de las direcciones de los recursos solicitados.

    // Simular datos del servidor.
    const datosSimulados = [
        "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
        "/prq0j1S0K07UjwLZLF6oMGflRUI.jpg",
        "/bSSx9Sq6irWwN9NTQmoT9KE8kXn.jpg",
        "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
        "/bTvHlcqiOjGa3lFtbrTLTM3zasY.jpg",
        "/xJS2GBeG1y6NeiSC2gtdi7Ml9Dx.jpg",
        "/18IsRVfs5MkkTcqTGlUAnka6sCh.jpg",
        "/qhb1qOilapbapxWQn9jtRCMwXJF.jpg"
    ];

    return(
        <div className='prueba enfila'>
            {datosSimulados.map((pelicula, index) => {
                return <PeliculaCarrete url={pelicula} index={index} />
            })}
        </div>
    )
}

export default CarretePeliculas