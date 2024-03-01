import React from 'react'
import { Link } from 'react-router-dom';
import Boton from './Boton';

import '../styles/Header.css';

function HeaderLogin() {

    return(
        <header className='centrar-vertical invertir-flex sin-fondo cabecera'>
            <Link to="/login">
                <Boton version='loginTransparente' />
            </Link>
        </header>
    )
}

export default HeaderLogin

/*

<Link to="/login">
            <button type='button' className='boton bordeado-amarillo'> Login </button>
        </Link>
*/