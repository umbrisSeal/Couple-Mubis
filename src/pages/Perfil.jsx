import React, { Fragment } from 'react';
import '../styles/Perfil.css';
import Header from '../components/Header';

function Perfil() {
    return <Fragment>
        <Header version='perfil' />
        <main className='fondo-rojo contenedor-informacion-perfil'>
            <p> Contenido principal </p>
        </main>
    </Fragment>
}

export default Perfil