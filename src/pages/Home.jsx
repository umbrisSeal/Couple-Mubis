import React, { Fragment } from 'react';
import '../styles/Home.css';
import Header from '../components/Header';
import Boton from '../components/Boton';
import Lista from '../components/Lista';


function Home() {

    const datosSimulados = {
        cantidadListas: 3,
        listas: [
            {
                id: 'XRT45GG',
                nombre: 'Para maratonear!!! de d deded dexe',
                editores: ['Michael Jackson', 'Speed Demon', 'Josue Torres', 'Marcus Finix'],
                privada: false,
                cantidadPeliculas: 4,
                urlPosters: ['qayga07ICNDswm0cMJ8P3VwklFZ.jpg', 'wMZU69sPEP8dSNU0nMWVt7b54EQ.jpg', 'O7ncXwZ9bowJGLAfIhe9ZaRZdi.jpg', 'v5wAZwRqpGWmyAaaJ8BBHYuNXnj.jpg'],

            },
            {
                id: 'ERT45GG',
                nombre: '',
                editores: [''],
                privada: false,
                cantidadPeliculas: 1,
                urlPosters: ['O7ncXwZ9bowJGLAfIhe9ZaRZdi.jpg'],

            },
            {
                id: 'ERT45GG',
                nombre: '',
                editores: [''],
                privada: false,
                cantidadPeliculas: 5,
                urlPosters: [],

            },
            {
                id: 'ERT45GG',
                nombre: '',
                editores: [''],
                privada: false,
                cantidadPeliculas: 4,
                urlPosters: [],

            },
        ]
    }


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
                        {/* Verificar que halla listas a nombre del usuario, si no, mostrar el elemento vacio. */}
                        {/* Hacer un .map para circular y crear una Lista y enviar como prop la informacion basica de la prop para renderizarla. */}
                        <Lista lista={datosSimulados.listas[0]} />
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