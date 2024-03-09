import React, { Fragment } from 'react';
import '../styles/Home.css';
import Header from '../components/Header';
import Boton from '../components/Boton';
import Lista from '../components/Lista';
import Pelicula from '../components/Pelicula';


function Home() {

    const datosSimulados = {
        cantidadListas: 5,
        listas: [
            {
                id: '3e9k7pd',
                nombre: 'Para maratonear!!! de d deded dexe',
                editores: ['Michael Jackson', 'Speed Demon', 'Josue Torres', 'Marcus Finix'],
                privada: false,
                cantidadPeliculas: 4,
                urlPosters: ['qayga07ICNDswm0cMJ8P3VwklFZ.jpg', 'wMZU69sPEP8dSNU0nMWVt7b54EQ.jpg', 'O7ncXwZ9bowJGLAfIhe9ZaRZdi.jpg', 'v5wAZwRqpGWmyAaaJ8BBHYuNXnj.jpg'],
            },
            {
                id: '8x1b2f9',
                nombre: '',
                editores: ['El Kevin', 'Jose Maximo'],
                privada: false,
                cantidadPeliculas: 1,
                urlPosters: ['O7ncXwZ9bowJGLAfIhe9ZaRZdi.jpg'],
            },
            {
                id: 'p4c6j2n',
                nombre: '',
                editores: [],
                privada: false,
                cantidadPeliculas: 5,
                urlPosters: ['vGujQOfGIaZx5UWxf9JdNEOxl7B.jpg', 'gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg', 'qBOKWqAFbveZ4ryjJJwbie6tXkQ.jpg', 'r0bEDWO2w4a43K2xTNSF284qOsc.jpg', 'UHxxkYe9tRdiPu0JFgcEL5hmQ4.jpg'],
            },
            {
                id: 'a7s8r9t',
                nombre: '',
                editores: [],
                privada: false,
                cantidadPeliculas: 4,
                urlPosters: ['gOnmaxHo0412UVr1QM5Nekv1xPi.jpg', 'aiRSl5NcDwayFTPrxtUcde6Y5P9.jpg', 'vmq4DK7jThHjGfLBT7gwtX4H4hO.jpg', 'eTdEaRjtVnFbd5KVhxLRfbYW46e.jpg'],
            },
            {
                id: 'a7s8r9t',
                nombre: 'Mi lista vacia',
                editores: [],
                privada: false,
                cantidadPeliculas: 0,
                urlPosters: [],
            },
            {
                id: 'a7s8r9t',
                nombre: 'Chaturelete',
                editores: [],
                privada: false,
                cantidadPeliculas: 1,
                urlPosters: ['uyNLq2Dc3s4IOdcYTU8ZtM2lTjb.jpg'],
            },
        ]
    }

    const datosSimulados2 = [
        {id: '671', titulo: 'Harry Potter and the Philosopher\'s Stone', año: 2013, urlPoster: 'wuMc08IPKEatf9rnMNXvIDxqP4W.jpg'},
        {id: 505832, titulo: "My Little Pony: Equestria Girls", año: 2012, urlPoster: 'dY7pdaPfbTnJnfnZBjRFprgRuUn.jpg'}
    ]


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
                        {datosSimulados.listas.length == 0 ?
                            <p> ¡Aun no has creado ninguna lista! </p>
                            :
                            datosSimulados.listas.map((lista, index) => {
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
                        <Lista lista={datosSimulados.listas[0]} />
                        {/* Agregar otro .map para mostrar las peliculas recomendads. */}
                        <Pelicula pelicula={datosSimulados2[1]} />
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

export default Home