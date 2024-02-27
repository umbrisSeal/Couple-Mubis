import React, { useState, useEffect } from 'react';
import Header from '../components/Header'

import '../styles/Bienvenida.css';

function Bienvenida() {
    const [imgHeight, setImgHeight] = useState(50);
    const [opacity, setOpacity] = useState(0);

    const maxImgHeight = 380;

    useEffect( () => {
        setImgHeight(maxImgHeight);
        setOpacity(1);
    }, []);



    return(
        <main className='fondo-radial'>
            <Header />
            <div className='centrar-contenido'>
                <div style={ {height: '80vh'} } className='contenedor-imagen'>
                    <img src='./src/assets/images/logo.png' alt='Logo de Couple Mubis'
                        style={{height: `${imgHeight.toString()}px`, opacity: opacity, margin: 'auto'} } className='animacion'
                    />
                </div>
                <h1 className='titulo-principal'> ¡Listas de películas para parejas y amigos! </h1>
            </div>
        </main>
    )
}

export default Bienvenida