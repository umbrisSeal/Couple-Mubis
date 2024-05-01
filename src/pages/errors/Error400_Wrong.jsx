import React from 'react'
import '../../styles/Errores.css';
import { Link } from 'react-router-dom';
import { obtenerImagen } from '../../assets/js/obtenerImagen';

function Error400_Wrong() {
    return(
        <main className='fondo-radial error-main-fondo pagina-error'>
            <div className='error-contenedor-central'>
                <img src={obtenerImagen('not_found.webp')} alt='De que me estas hablando padrino.' width={150} className='error-imagen-margen' />
                <h1> ¡Ups! </h1>
                <p> Algo ha salido mal. </p>
                <Link to='/home'>
                    <p> Volver a la pagina principal. </p>
                </Link>
            </div>
        </main>
    )
}

export default Error400_Wrong