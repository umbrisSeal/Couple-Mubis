import React from 'react'
import { useParams } from 'react-router-dom'
import { Fragment } from 'react';
import Header from '../components/Header';
import Boton from '../components/Boton';
import '../styles/VerPelicula.css'

function VerPelicula() {
    const { peliculaId } = useParams();
    const tamaño = 'w342';
    const prueba = 'original'

    const datosSimulados = {
        // Datos que vienen de la busqueda de la pelicula con su ID. (details get)
        titulo: 'Harry Potter and the Philosopher\'s Stone',
        sinopsis: 'Harry Potter has lived under the stairs at his aunt and uncle\'s house his whole life. But on his 11th birthday, he learns he\'s a powerful wizard—with a place waiting for him at the Hogwarts School of Witchcraft and Wizardry. As he learns to harness his newfound powers with the help of the school\'s kindly headmaster, Harry uncovers the truth about his parents\' deaths—and about the villain who\'s to blame.',
        polularidad: 160.886,
        año: 2001,
        calificacion: 7.915,
        urlPoster: 'wuMc08IPKEatf9rnMNXvIDxqP4W.jpg'
    }


    return <Fragment>
        <Header version='home' />
        <main className='fondo-radial-tenue fondo-completo-header presentacion-centrar' >
            <div className='contenedor-presentacion-pelicula'>
                <section className='presentacion-imagen'>
                    <img src={`https://image.tmdb.org/t/p/${tamaño}/${datosSimulados.urlPoster}`} alt='Imagen poster' />
                </section>
                <section>
                    <h1> {datosSimulados.titulo} </h1>
                    <h2> {`(${datosSimulados.año})`} </h2>
                    <br />
                    <p> {datosSimulados.sinopsis} </p>
                    <br />
                    <div className='contenedor-presentacion-puntuacion'>
                        <p className='puntuacion-calificacion'> {`☺ ${Math.round(datosSimulados.calificacion * 100)/100} / 10`} </p>
                        <p className='puntuacion-popularidad'> {`★ ${Math.round(datosSimulados.polularidad * 100)/100}`} </p>
                    </div>
                    <br />
                    <br />
                    <Boton version='agregarPelicula' />
                </section>
            </div>
        </main>
    </Fragment>
}

export default VerPelicula