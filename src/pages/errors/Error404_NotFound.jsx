import React from 'react'
import '../../styles/Errores.css';
import { Link } from 'react-router-dom';

function Error404_NotFound() {
    return(
        <main className='fondo-radial error-main-fondo pagina-error'>
            <div className='error-contenedor-central'>
                <img src='../src/assets/images/iconos/not_found.webp' alt='De que me estas hablando padrino.' width={150} className='error-imagen-margen' />
                <h1> Error 404 </h1>
                <p> No se ha encontrado la pagina solicitada. </p>
                <Link to='/home'>
                    <p> Volver a la pagina principal. </p>
                </Link>
            </div>
        </main>
    )
}

export default Error404_NotFound