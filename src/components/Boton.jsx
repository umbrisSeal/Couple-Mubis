import React from 'react'
import '../styles/Boton.css';
import { Link } from 'react-router-dom';

function Boton() {
    return(
        <Link to="/login">
            <button type='button' className='boton boton-bordeado amarillo'> Login </button>
        </Link>
    )
}

export default Boton