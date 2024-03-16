import React, { Fragment, useState } from 'react'
import '../styles/VerLista.css'
import { obtenerNombres } from '../assets/js/obtenerNombres';
import { useLoaderData, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import Boton from '../components/Boton';
import Pelicula from '../components/Pelicula';

function VerLista() {
    const datosLista = useLoaderData();
    const [peliculas, setPeliculas] = useState(datosLista.peliculas || []);
    const navegador = useNavigate();
    // Generar un state para datosLista para actualizarlos cuando sea necesario sin recargar la pagina.

    const handleVistaChange = (indexPelicula) => {
        let peliculasActualizadas = [...peliculas];
        peliculasActualizadas[indexPelicula].vista = !peliculas[indexPelicula].vista;
        setPeliculas(peliculasActualizadas);
        // Mandar a actualizar a la base de datos? O agregarlo a un useEffect[]?
    }

    const handleBorrarPelicula = (indexPelicula) => {
        let peliculasActualizadas = [...peliculas];
        peliculasActualizadas.splice(indexPelicula, 1);
        setPeliculas(peliculasActualizadas);
    }

    const handleBorrarLista = () => {
        // Mandar la solicitud HTTP para borrar la lista.
        // Una vez terminado, redireccionar al usuario a home.
        navegador('/home');
    }

    const actualizarColaboradores = (nuevosColaboradoresReorganizados) => {
        // Re-organizar los colaboradores y mandar la solicitud HTTP, tambien actualizar
        // nuestro state (crear uno nuevo para el loader.);
        console.log('autoridad original', colaboradoresReorganizados);
        console.log('nueva autoridad', nuevosColaboradoresReorganizados);

        console.log("Ser o no ser... aniquilado!");
    }

    const reorganizarColaboradores = (editores, lectores) => {
        // Toma 2 arreglos de objetos con los datos de los editores y lectores. Devuelve un solo arrelgo.
        const nuevosEditores = editores.map((editor) => {
            return {...editor, autoridad: 2};
        });
        const nuevosLectores = lectores.map((lector) => {
            return {...lector, autoridad: 1};
        });

        return [...nuevosEditores, ...nuevosLectores];
    }
    const colaboradoresReorganizados = reorganizarColaboradores(datosLista.editores, datosLista.lectores);



    return <Fragment>
        <Header version='home' />
        <main className='fondo-radial-tenue contenedor-main'>
            <section>
                <div className='vista-lista-titulos'>
                    <div>
                        <h1> Lista: {datosLista.nombre} </h1>
                        <p className='vista-lista-privacidad'> {datosLista.esPublica ? 'Lista Publica' : 'Lista Privada'} </p>
                    </div>
                    <div className={`vista-lista-botones ${datosLista.autoridad == 3 ? '' : 'ocultar'}`}>
                        <Boton version='listaEditar' colaboradoresReorganizados={colaboradoresReorganizados} actualizarColaboradores={actualizarColaboradores} />
                        <Boton version='listaBorrar' aceptar={handleBorrarLista} />
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
                        return <Pelicula version={datosLista.autoridad >= 2 ? 'enLista' : 'recomendaciones'} pelicula={pelicula} indexPelicula={index} handleVistaChange={handleVistaChange} handleBorrarPelicula={handleBorrarPelicula} key={pelicula + index} />
                    })
                : 
                    <p> ¡Esta lista aun no tiene peliculas! </p>
                }
            </section>
        </main>
    </Fragment>
}

export default VerLista