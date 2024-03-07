import React, { Fragment } from 'react';
import '../styles/Home.css';
import Header from '../components/Header';
import Boton from '../components/Boton';


function Home() {
    return (
        <Fragment>
            <Header version='home' />
            <main className='fondo-radial-tenue contenedor-main'>
                <section>
                    <div className='titulo-home'>
                        <h2> Tus Listas: </h2>
                        <Boton version='agregarLista' />
                    </div>
                    <div className='conjunto-listas'>
                        <p> Esto es una lista. </p>
                    </div>
                </section>
                <section>
                    <div className='titulo-home'>
                        <h2> Lo mas HOT del Mes: </h2>
                        <Boton version='verMas' />
                    </div>
                    <div className='conjunto-recomendados'>
                        <p> Esto es una pelicula. </p>
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

export default Home