import React, { Fragment } from 'react';
import '../styles/Home.css';
import Header from '../components/Header';


function Home() {
    return (
        <Fragment>
            <Header version='home' />
            <main className='fondo-radial-tenue contenedor-main'>
                <p> Otro dato. </p>
            </main>
        </Fragment>
    )
}

export default Home