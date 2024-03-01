import React from 'react'
import '../styles/Footer.css';
import Boton from './Boton';

function Footer() {
    return(
        <footer className='footer d-flex'>
            <h2> ¿Entonces, empezamos? </h2>
            <Boton version='carrete' />
        </footer>
    )
}

export default Footer