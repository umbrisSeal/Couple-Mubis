import React, { useEffect, useRef, useState } from 'react'
import '../styles/VentanaEmergente.css'
import Boton from './Boton'

function VentanaEmergente({version, handleBotonCancelar, nombrePelicula, handleBotonAceptar, indexPelicula, colaboradoresReorganizados}) {
    const ventanaRef = useRef(null);
    const [mostrarAgregarUsuarios, setMostrarAgregarUsuarios] = useState(false);

    useEffect(() => {
        const handleClickAfuera = (event) => {
            if(ventanaRef.current && !ventanaRef.current.contains(event.target)) {
                // Cerrar ventana emergente sin hacer nada.
                handleBotonCancelar();
            }
        };

        // Agrega eventListener con retraso para no hacer miss-click.
        const clickTimeout = setTimeout( () => {
            document.addEventListener('click', handleClickAfuera);
        }, 100);


        return () => {
            clearTimeout(clickTimeout);
            document.removeEventListener('click', handleClickAfuera);
        }
    }, []);

    const handleAceptar = () => {
        handleBotonAceptar(indexPelicula);
        handleBotonCancelar();
    }

    const handleGuardarCambios = () => {
        // Enviar la solicitud HTTP para actualizar la base de datos.
        // Actualizar tambien los datos actuales.
        // Esto se debe de hacer en el componente VerLista.
        handleBotonCancelar();
    }

    // Iniciador de Mensajes.
    const mensajesVentana = {
        borrarPeliculaLista: {titulo: 'Borrar Pelicula', mensaje: 'BORRAR-PELICULA', mensajeAceptar: 'Borrar Pelicula', mensajeCancelar: 'Cancelar'},
        borrarLista: {titulo: 'Borrar Lista', mensaje: '¿Seguro que quieres borrar esta lista? Se borrara de manera permanente! ', mensajeAceptar: 'Borrar Lista', mensajeCancelar: 'Cancelar'},
        editarLista: {titulo: 'Editar Colaboradores', mensaje: 'Selecciona los permisos de cada colaborador, o agrega nuevos.', mensajeAceptar: 'Guardar Cambios', mensajeCancelar: 'Cancelar'},
    }

    const mensaje = mensajesVentana[version] || {titulo: 'Mensaje no definido!', mensaje: 'Esta version de ventana emergente no esta definida.'};


    return (
        <section className='contenedor-ventana-emergente'>
            <div className='ventana-emergente' ref={ventanaRef}>
                <h2 className='ventana-titulo'> {mensaje.titulo} </h2>
                {mensaje.mensaje === 'BORRAR-PELICULA' ?
                    <p className='ventana-mensaje'> ¿Estas seguro de querer borrar <span className='ventana-mensaje-negritas'> {nombrePelicula} </span> de esta lista? </p>
                    : 
                    <p className='ventana-mensaje'> {mensaje.mensaje} </p>
                }
                {version == 'editarLista' ? 
                    !mostrarAgregarUsuarios ?
                        <div>
                        </div>
                    :
                        'Agregar usuarios.'
                :
                    <></>
                }
                <div className='ventana-botones'>
                    <div onClick={handleBotonCancelar}> <Boton version='ventanaCancelar' mensaje={mensaje.mensajeCancelar} /> </div>
                    <div onClick={version == 'editarLista' ? handleGuardarCambios : handleAceptar}> <Boton version='ventanaAceptar' mensaje={mensaje.mensajeAceptar} /> </div>
                </div>
            </div>
        </section>
    )
}

export default VentanaEmergente