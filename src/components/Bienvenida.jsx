import React, { useState, useEffect } from 'react';
import Header from '../components/Header'

import '../styles/Bienvenida.css';

function Bienvenida() {
    const [estilos, setEstilos] = useState('animar-inicio');

    useEffect( () => {
        setEstilos('animar-fin');
    }, []);

    // 80vh

    return(
        <main className='fondo-radial'>
            <Header version='login' />
            <div className='centrar-contenido'>
                <div className='contenedor-imagen'>
                    <img src='./src/assets/images/logo.png' alt='Logo de Couple Mubis'
                        className={`animacion ${estilos}`}
                    />
                </div>
                <h1 className='titulo-principal'> ¡Listas de películas para parejas y amigos! </h1>
            </div>
        </main>
    )
}

export default Bienvenida