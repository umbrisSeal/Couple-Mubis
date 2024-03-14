import React, { Fragment, useState } from 'react'
import '../styles/VerLista.css'
import { obtenerNombres } from '../assets/js/obtenerNombres';
import { useLoaderData } from 'react-router-dom'
import Header from '../components/Header';
import Boton from '../components/Boton';
import Pelicula from '../components/Pelicula';

function VerLista() {
    const datosLista = useLoaderData();
    const [peliculas, setPeliculas] = useState(datosLista.peliculas || []);

    //console.log(peliculas);

    const handleVistaChange = (indexPelicula) => {
        let peliculasActualizadas = [...peliculas];
        peliculasActualizadas[indexPelicula].vista = !peliculas[indexPelicula].vista;
        setPeliculas(peliculasActualizadas);
        // Mandar a actualizar a la base de datos? O agregarlo a un useEffect[]?
    }


    return <Fragment>
        <Header version='home' />
        <main className='fondo-radial-tenue contenedor-main'>
            <section>
                <div className='vista-lista-titulos'>
                    <div>
                        <h1> Lista: {datosLista.nombre} </h1>
                        <p className='vista-lista-privacidad'> {datosLista.esPublica ? 'Lista Publica' : 'Lista Privada'} </p>
                    </div>
                    <div className='vista-lista-botones'>
                        <Boton version='listaEditar' />
                        <Boton version='listaBorrar' />
                        {/* Crear ventanas emergentes. */}
                    </div>
                </div>
                <div className='vista-lista-editores'>
                    <p> {`Editores: ${obtenerNombres(datosLista.editores, datosLista.autoridad >= 2)}`} </p>
                    <p> {`Lectores: ${obtenerNombres(datosLista.lectores, datosLista.autoridad == 1)}`} </p>
                </div>
            </section>

            <section className='vista-lista-peliculas'>
                {peliculas.length > 0 ? 
                    peliculas.map((pelicula, index) => {
                        return <Pelicula version='enLista' pelicula={pelicula} indexPelicula={index} handleVistaChange={handleVistaChange} key={pelicula + index} />
                    })
                : 
                    <p> ¡Esta lista aun no tiene peliculas! </p>
                }
            </section>
        </main>
    </Fragment>
}

export default VerLista