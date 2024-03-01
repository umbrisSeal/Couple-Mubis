import React from 'react';
import { useState, useEffect } from 'react';
import Boton from './Boton';
import '../styles/SeccionPeliculas.css';
import { Link } from 'react-router-dom';


function SeccionPeliculas() {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        console.log(viewportWidth);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [window.innerWidth]);

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

    const datosSimulados2 = [
        "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
        "/prq0j1S0K07UjwLZLF6oMGflRUI.jpg",
        "/bSSx9Sq6irWwN9NTQmoT9KE8kXn.jpg",
        "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
        "/bTvHlcqiOjGa3lFtbrTLTM3zasY.jpg"
    ]

    const tamaño = "w342";

    const esPar = (index) => {
        return ((index) % 2) == 0;
    }

    return(
        <div className='fondo-peliculas centrar estirar'>
            <div className='contenedor-posters d-flex'>
                {datosSimulados.map((urlPoster, index) => {
                    // Con el viewportWidth, limitar numero de imagenes mostradas.
                    // Agregar o cambiar el tamaño del width de "contenedor-poster" para que sea con codigo y no albitrario. (280px)
                    // Se toma un margen del 90% del width
                    if ( Math.floor((viewportWidth * 0.95) / 280)-1 >= index || index == 0 ) {
                        return (
                            <div
                                style={{ rotate: `${esPar(index) ? '3deg' : '-3deg'}` }}
                                className={`contenedor-poster`}
                                key={Symbol(index).toString()}
                                >
                                <img src={`https://image.tmdb.org/t/p/${tamaño}/${urlPoster}`} alt='Poster promocional.' className='poster' />
                                <div className='darkener'></div>
                            </div>
                        )
                    } else {
                        return;
                    }
                })}
            </div>
            <div className='centrar centrar-texto d-flex flex-column texto-carrete'>
                <h2> Crea tu primera lista compartida de películas ahora: </h2>
                <Link to='/signin'>
                    <Boton version='carrete' />
                </Link>
            </div>
        </div>
    )
}

export default SeccionPeliculas