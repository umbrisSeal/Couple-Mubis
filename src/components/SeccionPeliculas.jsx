import React from 'react';
import '../styles/SeccionPeliculas.css';
import CarretePeliculas from './CarretePeliculas';


function SeccionPeliculas() {
    return(
        <div className='fondo-peliculas centrar'>
            <CarretePeliculas />
        </div>
    )
}

export default SeccionPeliculas