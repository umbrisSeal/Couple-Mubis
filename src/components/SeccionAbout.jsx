import React from 'react'
import '../styles/SeccionAbout.css';

function SeccionAbout() {
    return (
        <div className='fondo-rojo d-flex flex-row justify-content-between align-items-center'>
            <div className='medio-circulo izquierdo'></div>
            <div className='texto-rojo centrar-texto contenedor-about'>
                <h2> ¿Que es Couple Mubis? </h2>
                <p> Couple Mubis es una página para crear listas de películas "por ver", para no olvidar esa película que querías mostrarle a tu pareja o amigos. </p>
                <p> Couple Mubis te ayudará a llevar un registro de películas vistas, además de compartir tus listas de manera pública o privada con ese alguien especial. </p>
            </div>
            <div className='medio-circulo derecho'></div>
        </div>
    )
}

export default SeccionAbout