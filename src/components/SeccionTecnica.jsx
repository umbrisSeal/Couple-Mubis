import React from 'react'
import '../styles/SeccionTecnica.css';
import TarjetaTecnica from './TarjetaTecnica';

function SeccionTecnica() {
    return (
        <div className='contenedor-tecnico fondo-rojo'>
            <h2 className='centrar-texto'> Descripción Técnica </h2>
            <div className='contenedor-tarjetas d-flex gap-4 justify-content-center'>
                <TarjetaTecnica version='frontend' />
                <TarjetaTecnica version='backend' />
            </div>
        </div>
    )
}

export default SeccionTecnica