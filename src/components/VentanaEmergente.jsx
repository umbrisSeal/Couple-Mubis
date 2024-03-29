import React, { useEffect, useRef, useState } from 'react'
import '../styles/VentanaEmergente.css'
import Boton from './Boton'
import { copiarObjeto } from '../assets/js/copiarObjeto.js';

const datosSimulados = [
    // Datos simulados  de la lista de amigos del usuario. Quizas un useContext? Cookies? localstorage? preguntar aqui mismo?
    // No deberia mezclarse con la informacion de la lista... porque se supone que es informacion aparte no?

    // Conclusion, entonces esto se debe actualizar cada vez que se abre la ventana "editar Colaboradores", o mandarlo igual como prop. No creo
    // que sea muy eficiente.
    {id: 'RIGNOTA', nombre: 'Ringo Star', imgPerfil: 'anonimo.png', esColaborador: true},
    {id: 'J7t9KpWx', nombre: 'Pato Lucas', imgPerfil: 'anonimo.png', esColaborador: false},
    {id: 'R3y6NqPz', nombre: 'Rico McPato', imgPerfil: 'anonimo.png', esColaborador: false},
    {id: 'E5u8MoYv', nombre: 'Obama Barack', imgPerfil: 'anonimo.png', esColaborador: false},
    {id: 'A2s4LpTx', nombre: 'Laios Gloton', imgPerfil: 'anonimo.png', esColaborador: false},
    {id: 'F9i3DqWs', nombre: 'Eren Yaguer', imgPerfil: 'anonimo.png', esColaborador: false},
    {id: 'G1h7RpUz', nombre: 'Nezuko Kalamardo', imgPerfil: 'anonimo.png', esColaborador: false},
    {id: 'K6l8NsYo', nombre: 'Chavo del 8', imgPerfil: 'anonimo.png', esColaborador: false},
]

function VentanaEmergente({version, handleBotonCancelar, nombrePelicula, handleBotonAceptar, indexPelicula, colaboradoresReorganizados, actualizarColaboradores}) {
    const ventanaRef = useRef(null);
    const [mostrarAgregarUsuarios, setMostrarAgregarUsuarios] = useState(false);
    const [colaboradores, setColaboradores] = useState([]);
    const [nombreNuevaLista, setNombreNuevaLista] = useState('');
    const [mostrarError, setMostrarError] = useState(false);
    const [amigosColaboradores, setAmigosColaboradores] = useState([]);

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

    useEffect(() => {
        // Quizas elminar esto, y consultar los datos siempre al empezar.
        // No podra actualizar y agregar usuarios al mismo tiempo.
        // Aqui debe de ser la solicitud HTTP para consultar los amigos.
        setAmigosColaboradores(copiarObjeto(datosSimulados));
    }, [])

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

    const handleAgregarAmigoColaborador = (indexAmigo) => {
        let nuevosColaboradores = copiarObjeto(colaboradores);
        const amigoAEditar = {...amigosColaboradores[indexAmigo]};
        const indexColaborador = colaboradores.findIndex((colaborador) => {
            return colaborador.id == amigoAEditar.id;
        });

        if(indexColaborador == -1) {
            // El amigo no es colaborador, agregarlo (siempre como lector primero).
            nuevosColaboradores.push({id: amigoAEditar.id, nombre: amigoAEditar.nombre, imgPerfil: amigoAEditar.imgPerfil, autoridad: 1})
        } else {
            // El amigo ya es colaborador, borrarlo.
            nuevosColaboradores.splice(indexColaborador, 1);
        }

        setColaboradores(nuevosColaboradores);
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
                        <div className='ventana-tabla'>
                            <table>
                                <tbody>
                                    {amigosColaboradores.map((amigo, index) => {
                                        return <tr key={amigo + index}>
                                            <td className='columna-imagen'> <img src={`../src/assets/images/perfiles/${amigo.imgPerfil}`} alt='Img Perfil' /> </td>
                                            <td className='columna-nombre'> {amigo.nombre} </td>
                                            <td className='columna-boton'> <Boton version='agregarColaborador' estadoInicial={amigo.esColaborador} indexAmigo=
                                            {index} handleChange={handleAgregarAmigoColaborador} /> </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
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