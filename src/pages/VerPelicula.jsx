import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Fragment } from 'react';
import Header from '../components/Header';
import Boton from '../components/Boton';
import '../styles/VerPelicula.css'

function VerPelicula() {
    const datosPelicula = useLoaderData();
    const tamaño = 'w342';
    const prueba = 'original'


    return <Fragment>
        <Header version='home' />
        <main className='fondo-radial-tenue fondo-completo-header presentacion-centrar' >
            <div className='contenedor-presentacion-pelicula'>
                <section className='presentacion-imagen'>
                    <img src={`https://image.tmdb.org/t/p/${prueba}/${datosPelicula.urlPoster}`} alt='Imagen poster' />
                </section>
                <section>
                    <h1> {datosPelicula.titulo} </h1>
                    <h2> {`(${datosPelicula.año})`} </h2>
                    <br />
                    <p> {datosPelicula.sinopsis} </p>
                    <br />
                    <div className='contenedor-presentacion-puntuacion'>
                        <p className='puntuacion-calificacion'> {`☺ ${Math.round(datosPelicula.calificacion * 100)/100} / 10`} </p>
                        <p className='puntuacion-popularidad'> {`★ ${Math.round(datosPelicula.popularidad * 100)/100}`} </p>
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