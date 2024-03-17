import React, { useEffect, useRef, useState } from 'react'
import '../styles/VentanaEmergente.css'
import Boton from './Boton'
import { copiarObjeto } from '../assets/js/copiarObjeto.js';

function VentanaEmergente({version, handleBotonCancelar, nombrePelicula, handleBotonAceptar, indexPelicula, colaboradoresReorganizados, actualizarColaboradores}) {
    const ventanaRef = useRef(null);
    const [mostrarAgregarUsuarios, setMostrarAgregarUsuarios] = useState(false);
    const [colaboradores, setColaboradores] = useState([]);
    const [nombreNuevaLista, setNombreNuevaLista] = useState('');
    const [mostrarError, setMostrarError] = useState(false);

    useEffect(() => {
        setColaboradores(copiarObjeto(colaboradoresReorganizados));

        const handleClickAfuera = (event) => {
            if(ventanaRef.current && !ventanaRef.current.contains(event.target)) {
                // Cerrar ventana emergente sin hacer nada.
                handleBotonCancelar();
            }
        };

        document.addEventListener('mouseup', handleClickAfuera);

        return () => {
            document.removeEventListener('mouseup', handleClickAfuera);
        }
    }, []);

    const validarInput = (valorInput) => {
        // Retorna verdadero si es correcto.
        const regexCaracteresEspeciales = /^[a-zA-Z0-9.,?!+\-\s]*$/
        return regexCaracteresEspeciales.test(valorInput) && valorInput.length <= 30 && valorInput.length > 0;
    }

    const handleNombreListaNueva = (event) => setNombreNuevaLista(event.target.value);
    const handleBotonAgregarUsuarios = () => setMostrarAgregarUsuarios(!mostrarAgregarUsuarios);

    const handleAceptar = () => {
        if(version == 'agregarLista' && !validarInput(nombreNuevaLista)) {
            setMostrarError(true);
            return;
        }

        handleBotonAceptar(indexPelicula);
        handleBotonCancelar();
    }

    const handleChangeAutoridad = (colaboradorIndex, nuevaAutoridad) => {
        // Actualiza la autoridad del colaborador seleccionado.
        // Verificar que el PROP original no ha sido afectado! y solo se cambio nuestro state.
        let colaboradoresActualizados = copiarObjeto(colaboradores);
        colaboradoresActualizados[colaboradorIndex].autoridad = nuevaAutoridad;
        setColaboradores(colaboradoresActualizados);
    }

    const handleGuardarCambios = () => {
        // Enviar la solicitud HTTP para actualizar la base de datos.
        // Actualizar tambien los datos actuales.
        // Esto se debe de hacer en el componente VerLista.
        if(actualizarColaboradores) {
            actualizarColaboradores(colaboradores);
        }
        handleBotonCancelar();
    }

    // Iniciador de Mensajes.
    const mensajesVentana = {
        borrarPeliculaLista: {titulo: 'Borrar Pelicula', mensaje: 'BORRAR-PELICULA', mensajeAceptar: 'Borrar Pelicula', mensajeCancelar: 'Cancelar'},
        borrarLista: {titulo: 'Borrar Lista', mensaje: '¿Seguro que quieres borrar esta lista? Se borrara de manera permanente! ', mensajeAceptar: 'Borrar Lista', mensajeCancelar: 'Cancelar'},
        editarLista: {titulo: 'Editar Colaboradores', mensaje: 'Selecciona los permisos de cada colaborador, o agrega nuevos.', mensajeAceptar: 'Guardar Cambios', mensajeCancelar: 'Cancelar'},
        agregarLista: {titulo: 'Crear Lista', mensaje: 'Crea una nueva lista para añadir peliculas.', mensajeAceptar: 'Crear Lista', mensajeCancelar: 'Cancelar' },

    }

    
    const contenidos = {
        agregarLista:
            <div className='ventana-contenido-input'>
                <label htmlFor='nueva-lista-nombre'> Nombre de la nueva lista: </label>
                <input className='configuracion-input input-listanueva' id='nueva-lista-nombre' maxLength={30} value={nombreNuevaLista} onChange={handleNombreListaNueva} />
                <span className='configuracion-indicador-caracteres'> {`${nombreNuevaLista.length} / 30`} </span>
                {mostrarError ?
                    <div className='ventana-mensaje-error'>
                        <p> El nombre no puede estar vacio y los unicos caracteres especiales permitidos son: ? ! - + . , </p>
                    </div> : <></>
                }
            </div>,
        editarLista:
            version == 'editarLista' ? 
                !mostrarAgregarUsuarios ?
                    <div className='ventana-contenedor-especial'>
                        <div onClick={handleBotonAgregarUsuarios} className='ventana-contenedor-boton'> <Boton version='cambiarVentana' mensaje='Añadir Colaboradores' /> </div>
                        <div className='ventana-tabla'>
                            <table>
                                <tbody>
                                    {colaboradores.map((colaborador, index) => {
                                        return <tr key={colaborador + index}>
                                            <td className='columna-imagen'> <img src={`../src/assets/images/perfiles/${colaborador.imgPerfil}`} alt='Img Perfil' /> </td>
                                            <td className='columna-nombre'> {colaborador.nombre} </td>
                                            <td className='columna-boton'>
                                                <Boton version='seleccionAutoridad' autoridad={colaborador.autoridad} indexColaborador={index} handleChange={handleChangeAutoridad} />
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                :
                    <div className='ventana-contenedor-especial'>
                        <div onClick={handleBotonAgregarUsuarios} className='ventana-contenedor-boton'> <Boton version='cambiarVentana' mensaje='Editar Colaboradores' /> </div>
                    </div>
            :
                <></>,
    };

    const mensaje = mensajesVentana[version] || {titulo: 'Mensaje no definido!', mensaje: 'Esta version de ventana emergente no esta definida.'};
    const contenido = contenidos[version] || <></>;


    return (
        <section className='contenedor-ventana-emergente'>
            <div className='ventana-emergente' ref={ventanaRef}>
                <h2 className='ventana-titulo'> {mensaje.titulo} </h2>
                {mensaje.mensaje === 'BORRAR-PELICULA' ?
                    <p className='ventana-mensaje'> ¿Estas seguro de querer borrar <span className='ventana-mensaje-negritas'> {nombrePelicula} </span> de esta lista? </p>
                    : 
                    <p className='ventana-mensaje'> {mensaje.mensaje} </p>
                }
                { contenido }
                <div className='ventana-botones'>
                    <div onClick={handleBotonCancelar}> <Boton version='ventanaCancelar' mensaje={mensaje.mensajeCancelar} /> </div>
                    <div onClick={version == 'editarLista' ? handleGuardarCambios : handleAceptar}> <Boton version='ventanaAceptar' mensaje={mensaje.mensajeAceptar} /> </div>
                </div>
            </div>
        </section>
    )
}

export default VentanaEmergente