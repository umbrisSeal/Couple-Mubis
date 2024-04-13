import React, { Fragment } from 'react';
import '../styles/Home.css';
import Header from '../components/Header';
import Boton from '../components/Boton';
import Lista from '../components/Lista';
import Pelicula from '../components/Pelicula';
import { useLoaderData } from 'react-router-dom';


function Home() {
    const { peliculasRecomendadas, listasUsuario } = useLoaderData();

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
                        {listasUsuario.listas.length == 0 ?
                            <p> ¡Aun no has creado ninguna lista! </p>
                            :
                            listasUsuario.listas.map((lista, index) => {
                                return <Lista key={index + lista.nombre} lista={lista} />
                            })
                        }
                    </div>
                </section>
                <section>
                    <div className='titulo-home'>
                        <h2> Lo mas HOT del Mes: </h2>
                        <Boton version='verMas' />
                    </div>
                    <div className='conjunto-recomendados'>
                        {peliculasRecomendadas.map((pelicula, index) => {
                            return <Pelicula version='recomendada' pelicula={pelicula} key={pelicula + index} />
                        } )}
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

export default Home