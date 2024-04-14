import React, { Fragment, useEffect, useState } from 'react'
import '../styles/VerLista.css'
import { obtenerNombres } from '../assets/js/obtenerNombres';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header';
import Boton from '../components/Boton';
import Pelicula from '../components/Pelicula';
import { copiarObjeto } from '../assets/js/copiarObjeto';
import DIRECCIONES from '../assets/js/diccionarioURLs';

function VerLista() {
    const datosLista = useLoaderData();
    const [peliculas, setPeliculas] = useState(datosLista.peliculas || []);
    const navegador = useNavigate();
    const [lista, setLista] = useState(useLoaderData());
    const parametrosURL = useParams();
    // Generar un state para datosLista para actualizarlos cuando sea necesario sin recargar la pagina.

    useEffect(() => {
        setLista(copiarObjeto(datosLista));
    }, []);

    const handleVistaChange = (indexPelicula) => {
        let peliculasActualizadas = [...peliculas];
        peliculasActualizadas[indexPelicula].vista = !peliculas[indexPelicula].vista;
        setPeliculas(peliculasActualizadas);
        // Mandar a actualizar a la base de datos? O agregarlo a un useEffect[]?
    }

    const handleBorrarPelicula = async (indexPelicula) => {
        let peliculasActualizadas = [...peliculas];
        peliculasActualizadas.splice(indexPelicula, 1);
        setPeliculas(peliculasActualizadas);

        // Enviar la solicitud para actualizar peliculas.
        const requestBody = {
            listaID: parametrosURL.listaId,
            peliculas: peliculasActualizadas
        };
        try {
            const jsonBody = JSON.stringify(requestBody);
            const confirmacion = await fetch(`${DIRECCIONES.BACKEND}/api/pelicula`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                    'Content-Type': 'application/json'
                },
                body: jsonBody
            }).then(response => response.ok).catch(error => error);
            console.log(confirmacion);
        } catch {}
    }

    const handleBorrarLista = async () => {
        // Mandar la solicitud HTTP para borrar la lista.
        // Una vez terminado, redireccionar al usuario a home.
        try {
            const listaID = parametrosURL.listaId;
            const requestBody = {listaID};
            const jsonBody = JSON.stringify(requestBody);

            const confirmacion = await fetch(`${DIRECCIONES.BACKEND}/api/lista`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                    'Content-Type': 'application/json'
                },
                body: jsonBody
            }).then(response => response.ok).catch(error => error);
            
            navegador('/home');
        } catch {}
    }

    const actualizarColaboradores = (nuevosColaboradoresReorganizados) => {
        // Re-organizar los colaboradores y mandar la solicitud HTTP, tambien actualizar
        // nuestro state (crear uno nuevo para el loader.);
        //console.log('autoridad original', colaboradoresReorganizados);
        //console.log('nueva autoridad', nuevosColaboradoresReorganizados);

        const nuevosEditores = nuevosColaboradoresReorganizados.filter((colaborador) => {
            return colaborador.autoridad == 2;
        })
        const nuevosLectores = nuevosColaboradoresReorganizados.filter((colaborador) => {
            return colaborador.autoridad == 1;
        })

        console.log('editores', nuevosEditores);
        console.log('lectores',nuevosLectores)

        let nuevaLista = copiarObjeto(lista);
        nuevaLista.editores = nuevosEditores;
        nuevaLista.lectores = nuevosLectores;

        setLista(nuevaLista);

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
    const colaboradoresReorganizados = reorganizarColaboradores(lista.editores, lista.lectores);

    return <Fragment>
        <Header version='home' />
        <main className='fondo-radial-tenue contenedor-main'>
            <section>
                <div className='vista-lista-titulos'>
                    <div>
                        <h1> Lista: {lista.nombre} </h1>
                        <p className='vista-lista-privacidad'> {lista.esPublica ? 'Lista Publica' : 'Lista Privada'} </p>
                    </div>
                    <div className={`vista-lista-botones ${lista.autoridad == 3 ? '' : 'ocultar'}`}>
                        <Boton version='listaEditar' colaboradoresReorganizados={colaboradoresReorganizados} actualizarColaboradores={actualizarColaboradores} />
                        <Boton version='listaBorrar' aceptar={handleBorrarLista} />
                        {/* Crear ventanas emergentes. */}
                    </div>
                </div>
                <div className='vista-lista-editores'>
                    <p> {`Editores: ${obtenerNombres(lista.editores, lista.autoridad >= 2)}`} </p>
                    <p> {`Lectores: ${obtenerNombres(lista.lectores, lista.autoridad == 1)}`} </p>
                </div>
            </section>

            <section className='vista-lista-peliculas'>
                {peliculas.length > 0 ? 
                    peliculas.map((pelicula, index) => {
                        return <Pelicula version={lista.autoridad >= 2 ? 'enLista' : 'recomendaciones'} pelicula={pelicula} indexPelicula={index} handleVistaChange={handleVistaChange} handleBorrarPelicula={handleBorrarPelicula} key={pelicula + index} />
                    })
                : 
                    <p> ¡Esta lista aun no tiene peliculas! </p>
                }
            </section>
        </main>
    </Fragment>
}

export default VerLista