import React, { useEffect, useRef } from 'react'
import '../styles/VentanaEmergente.css'
import Boton from './Boton'

function VentanaEmergente({handleVentanaEmergente, nombrePelicula, handleBorrarPelicula, indexPelicula}) {
    const ventanaRef = useRef(null);

    useEffect(() => {
        const handleClickAfuera = (event) => {
            if(ventanaRef.current && !ventanaRef.current.contains(event.target)) {
                // Cerrar ventana emergente sin hacer nada.
                handleVentanaEmergente();
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

    const handleBotonBorrar = () => {
        handleBorrarPelicula(indexPelicula);
        handleVentanaEmergente();
    }


    return (
        <section className='contenedor-ventana-emergente'>
            <div className='ventana-emergente' ref={ventanaRef}>
                <h2 className='ventana-titulo'> Borrar Pelicula </h2>
                <p className='ventana-mensaje'> ¿Estas seguro de querer borrar <span className='ventana-mensaje-negritas'> {nombrePelicula} </span> de esta lista? </p>
                <div className='ventana-botones'>
                    <div onClick={handleVentanaEmergente}> <Boton version='ventanaCancelar' /> </div>
                    <div onClick={handleBotonBorrar}> <Boton version='ventanaAceptar' /> </div>
                </div>
            </div>
        </section>
    )
}

export default VentanaEmergente