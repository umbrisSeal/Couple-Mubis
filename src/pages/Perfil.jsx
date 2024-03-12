import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Perfil.css';
import { obtenerNivel } from '../assets/js/niveles';
import Header from '../components/Header';
import Boton from '../components/Boton';

function Perfil() {

    const datosSimulados = {
        nombre: 'Mac Giver',
        id: 'RT0054AWSA',
        xp: 210,
        bibliografia: 'Hola! Soy Mac Gyver, autentico cineasta de los años 60. Vivi en una casa de campo hasta mis 50 años, ahora me dedico a criticar gente en internet.',
        esAmigo: false,
        esBloqueado: false,
        listasPublicas: [
            {nombre: 'La Toalla del Mojado', id: 'RFRTG31'},
            {nombre: 'Mis Actuaciones de 1971', id: 'RTGAW21'},
            {nombre: 'James Bond', id:'J5B4GG'},
        ]
    }

    return <Fragment>
        <Header version='perfil' />
        <main className='fondo-rojo contenedor-informacion-perfil'>
            <div className='contenedor-informacion-perfil-perfil'>
                <h1 className='negritas'> {datosSimulados.nombre} </h1>
                <p> {`ID: ${datosSimulados.id}`} </p>
                <br />
                <p> {`Nivel ${obtenerNivel(datosSimulados.xp).nivel}`} </p>
                <h4 className='negritas'> {obtenerNivel(datosSimulados.xp).nombreNivel} </h4>
                <br />
                <div id='perfil-botones'>
                    <Boton version='perfilAgregar' />
                    <Boton version='perfilBloquear' />
                </div>
                <br />
                <br />
                <p> Bibliografia: </p>
                <p id='perfil-bibliografia'> {datosSimulados.bibliografia} </p>
                <br />
                <br />
                <br />
                <p> Listas Publicas: </p>
                <div id='perfil-conjunto-listas'>
                    {datosSimulados.listasPublicas.map((lista, index) => {
                        return(
                            <Link to={`/lista/${lista.id}`} className='no-hypervinculo' key={lista + index}>
                                <div className='perfil-lista'>
                                    <img src='../src/assets/images/iconos/pelicula-roja.png' alt='Icono Pelicula' width={50} />
                                    <p> {lista.nombre} </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </main>
    </Fragment>
}

export default Perfil