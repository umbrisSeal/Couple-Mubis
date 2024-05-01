import React, { useEffect, useRef, useState } from 'react'
import '../styles/VentanaEmergente.css'
import Boton from './Boton'
import { copiarObjeto } from '../assets/js/copiarObjeto.js';
import { useParams } from 'react-router-dom';
import DIRECCIONES from '../assets/js/diccionarioURLs.js';
import { obtenerImagen } from '../assets/js/obtenerImagen.js';

function VentanaEmergente({version, handleBotonCancelar, nombrePelicula, handleBotonAceptar, indexPelicula, colaboradoresReorganizados, actualizarColaboradores}) {
    const ventanaRef = useRef(null);
    const [mostrarAgregarUsuarios, setMostrarAgregarUsuarios] = useState(false);
    const [colaboradores, setColaboradores] = useState([]);
    const [nombreNuevaLista, setNombreNuevaLista] = useState('');
    const [mostrarError, setMostrarError] = useState(false);
    const [amigosColaboradores, setAmigosColaboradores] = useState([]);
    const [listas, setListas] = useState([]);
    const [nuevasListas, setNuevasListas] = useState([]);
    const parametrosURL = useParams();

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

    async function handleObtenerListasUsuario() {
        const peliculaID = parametrosURL.peliculaId;
        const peliculaIDInt = parseInt(peliculaID);
        const requestBody = {peliculaID: peliculaIDInt};
        try {
            const jsonBody = JSON.stringify(requestBody);
            const listasUsuario = await fetch(`${DIRECCIONES.BACKEND}/api/usuario/listas`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                    'Content-Type': 'application/json'
                },
                body: jsonBody
            }).then(response => response.json()).then(data => data).catch(error => []);
            setListas(listasUsuario);
            setNuevasListas(copiarObjeto(listasUsuario));
        } catch {}
    };

    async function handleAgregarPeliculas() {
        const peliculaID = parametrosURL.peliculaId;

        const peliculasParaAgregar = nuevasListas.filter((lista) => {
            const peliculaAgregada = lista.peliculaAgregada;
            if(peliculaAgregada) {
                // Filtro para evitar agregar la pelicula si ya estaba agregada a la lista.
                const listaID = lista.listaID;
                const indexLista = listas.findIndex((lista) => lista.listaID === listaID);
                if(listas[indexLista].peliculaAgregada) return false;
            }
            return lista.peliculaAgregada
        });
        /*
            TODO: Riezgo potencial de que el JSON.stringify no funcione y arruine la solicitud.
        */
        const confirmaciones = await Promise.all(peliculasParaAgregar.map(async (lista) => {
            return fetch(`${DIRECCIONES.BACKEND}/api/pelicula`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({peliculaID: peliculaID, listaID: lista.listaID})
            }).then(response => response.ok).catch(error => false);
        })).then(responses => responses);
    }

    async function handleConsultarAmigosColaboradores() {
        const datosAmigosColaboradores = await fetch(`${DIRECCIONES.BACKEND}/api/amigos/colaboradores/${parametrosURL.listaId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`
            }
        }).then(response => response.json()).then(data => data).catch(error => {});
        setAmigosColaboradores(datosAmigosColaboradores);
    }

    useEffect(() => {

        if(version === 'agregarPelicula') {
            const fetchLista = async () => {
                await handleObtenerListasUsuario();
            };
            fetchLista();
        }
        if(version === 'editarLista') {
            const fetchAmigosColaboradores = async () => {
                await handleConsultarAmigosColaboradores();
            };
            fetchAmigosColaboradores();
        }

    }, [])

    const validarInput = (valorInput) => {
        // Retorna verdadero si es correcto.
        const regexCaracteresEspeciales = /^[a-zA-Z0-9.,?!+\-\s]*$/
        return regexCaracteresEspeciales.test(valorInput) && valorInput.length <= 30 && valorInput.length > 0;
    }

    const handleNombreListaNueva = (event) => setNombreNuevaLista(event.target.value);
    const handleBotonAgregarUsuarios = () => setMostrarAgregarUsuarios(!mostrarAgregarUsuarios);

    const handleAceptar = async () => {
        if(version == 'agregarLista' && !validarInput(nombreNuevaLista)) {
            setMostrarError(true);
            return;
        }

        // Funcionalidades de solicitudes HTTP.
        if(version === 'agregarLista' && validarInput(nombreNuevaLista)) {
            await handleBotonAceptar(nombreNuevaLista);
            handleBotonCancelar();
            return;
        }
        if(version === 'agregarPelicula') {
            await handleAgregarPeliculas();
            handleBotonCancelar();
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

    const handleAgregarPelicula = (peliculaIndex, nuevoValor) => {
        let listaCopia = copiarObjeto(nuevasListas);
        listaCopia[peliculaIndex].peliculaAgregada = nuevoValor;
        setNuevasListas(copiarObjeto(listaCopia));
    };

    // Iniciador de Mensajes.
    const mensajesVentana = {
        borrarPeliculaLista: {titulo: 'Borrar Pelicula', mensaje: 'BORRAR-PELICULA', mensajeAceptar: 'Borrar Pelicula', mensajeCancelar: 'Cancelar'},
        borrarLista: {titulo: 'Borrar Lista', mensaje: '¿Seguro que quieres borrar esta lista? Se borrara de manera permanente! ', mensajeAceptar: 'Borrar Lista', mensajeCancelar: 'Cancelar'},
        editarLista: {titulo: 'Editar Colaboradores', mensaje: 'Selecciona los permisos de cada colaborador, o agrega nuevos.', mensajeAceptar: 'Guardar Cambios', mensajeCancelar: 'Cancelar'},
        agregarLista: {titulo: 'Crear Lista', mensaje: 'Crea una nueva lista para añadir peliculas.', mensajeAceptar: 'Crear Lista', mensajeCancelar: 'Cancelar' },
        agregarPelicula: {titulo: 'Agregar Pelicula', mensaje: 'Selecciona la lista a la cual agregar esta pelicula.', mensajeAceptar: 'Guardar Cambios', mensajeCancelar: 'Cancelar'},
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
                                            <td className='columna-imagen'> <img src={obtenerImagen(`${colaborador.imgPerfil}`)} alt='Img Perfil' /> </td>
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
                                            <td className='columna-imagen'> <img src={obtenerImagen(`${amigo.imgPerfil}`)} alt='Img Perfil' /> </td>
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
        agregarPelicula:
            <div className='ventana-contenedor-especial'>
                <div className='ventana-tabla'>
                    <table>
                        <tbody>
                            {listas.map((lista, index) => {
                                return <tr key={`${index} + ${lista}`}>
                                    <td className='columna-nombre columna-listas'> {lista.nombre} </td>
                                    <td>
                                        <Boton
                                            version='checkBox'
                                            estadoInicial={lista.peliculaAgregada}
                                            indexLista={index}
                                            handleChange={handleAgregarPelicula}
                                        />
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>,
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