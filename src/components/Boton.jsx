import React, { Fragment, useState } from 'react'
import '../styles/Boton.css';
import VentanaEmergente from './VentanaEmergente';
import { useNavigate } from 'react-router-dom';
import DIRECCIONES from '../assets/js/diccionarioURLs';


function Boton(props) {
    const [vista, setVista] = useState(props.vista || false);
    const [mostrarVentana, setMostrarVentana] = useState(false);
    const [opcionSelect, setOpcionSelect] = useState(props.autoridad || 0);
    const [estadoBoton, setEstadoBoton] = useState(props.estadoInicial || false);

    const handleEstadoBoton = () => {
        if(props.handleChange) {
            props.handleChange(props.indexAmigo);
        }
        setEstadoBoton(!estadoBoton);
    }



    const handleChange = () => {
        props.handleBotonChange();
        setVista(!vista);
    }

    const handleVentanaEmergente = () => {
        setMostrarVentana(!mostrarVentana);
    }

    const handleSelectChange = (event) => {
        setOpcionSelect(event.target.value.toString());
        if(props.handleChange && props.version == 'seleccionAutoridad') {
            props.handleChange(props.indexColaborador, parseInt(event.target.value));
        }
    }

    // Solicitudes HTTP:
    const crearNuevaLista = async (nuevaListaNombre) => {
        const requestBody = {nuevoNombre: nuevaListaNombre};
        try {
            const jsonBody = JSON.stringify(requestBody);
            const confirmacion = await fetch(`${DIRECCIONES.BACKEND}/api/lista`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                    'Content-Type': 'application/json'
                },
                body: jsonBody
            }).then(response => response.ok).catch(error => false);
        } catch {}

        handleVentanaEmergente();
        window.location.reload();
    }

    const versionBoton = {
        loginTransparente: <button type='button' className='boton bordeado-amarillo'> Login </button>,
        carrete: <button type='button' className='boton-grande amarillo'> Crea una cuenta </button>,
        loginSubmit: <button type='submit' className='boton-mediano azul texto-capital'> {props.texto ? props.texto : 'Entrar'} </button>,
        verPelicula: <button type='button' className='boton-borde boton-grande borde-rojo-intenso texto-capital'> Ver pelicula </button>,
        agregarLista:
            <Fragment>
                <button type='button' className='boton-borde borde-amarillo texto-grande texto-capital' onClick={handleVentanaEmergente}>
                    <div className='contenedor-doble negritas'>
                        <img src='../src/assets/images/iconos/pelicula.png' alt='Icono Pelicula' height={30} width={30} />
                        <p> Crear lista </p>
                    </div>
                </button>
                {mostrarVentana ?
                    <VentanaEmergente handleBotonCancelar={handleVentanaEmergente} version='agregarLista' handleBotonAceptar={crearNuevaLista} />
                : <></>}
            </Fragment>,
        verMas:
            <button type='button' className='boton-borde borde-rojo texto-grande texto-capital'>
                <div className='contenedor-doble negritas'>
                    <img src='../src/assets/images/iconos/verMas.png' alt='Icono Lupa' height={30} width={30} />
                    <p> Ver mas </p>
                </div>
            </button>,
        agregarPelicula:
            <button className='boton-agregar amarillo'>
                <div className='contenedor-doble negritas'>
                    <img src='../src/assets/images/iconos/boleto.png' alt='Icono Agregar' height={30} width={30} />
                    <p> Agregar Pelicula </p>
                </div>
            </button>,
        perfilAgregar: <button type='button' className='perfil-boton perfil-boton-amarillo negritas'> {props.mensaje || 'Agregar Contacto'} </button>,
        perfilBloquear: <button type='button' className='perfil-boton perfil-boton-rojo negritas'> {props.mensaje || 'Bloquear Usuario'} </button>,
        perfilGuardar: <button type='submit' className='perfil-boton perfil-boton-amarillo negritas'> {props.mensaje || 'Mensaje no definido.'} </button>,
        perfilBorrar: <button type='submit' className='perfil-boton perfil-boton-rojo negritas'> {props.mensaje || 'Mensaje no definido.'} </button>,
        listaEditar: <Fragment>
            <button type='button' className='boton-lista lista-gris' onClick={handleVentanaEmergente} > Editar Lista </button>
            {mostrarVentana ? <VentanaEmergente colaboradoresReorganizados={props.colaboradoresReorganizados} version='editarLista' handleBotonCancelar={handleVentanaEmergente} actualizarColaboradores={props.actualizarColaboradores} />
            : ''}
            {/* */}
        </Fragment>,
        listaBorrar: <Fragment>
            <button type='button' className='boton-lista lista-rojo' onClick={handleVentanaEmergente}> Borrar Lista </button>
            {mostrarVentana ? <VentanaEmergente version='borrarLista' handleBotonCancelar={handleVentanaEmergente} handleBotonAceptar={props.aceptar} /> : ''}
        </Fragment>,
        peliculaBorrar: <Fragment>
            <button type='button' className='boton-pelicula boton-pelicula-borrar' onClick={handleVentanaEmergente}> Borrar </button>
            {mostrarVentana ? <VentanaEmergente version='borrarPeliculaLista' handleBotonCancelar={handleVentanaEmergente} nombrePelicula={props.nombrePelicula} handleBotonAceptar={props.handleBorrarPelicula} indexPelicula={props.indexPelicula} /> : ''}
        </Fragment>,
        peliculaVer: <button type='button' className={`boton-pelicula ${vista ? 'boton-pelicula-vista' : 'boton-pelicula-novista'}`} onClick={handleChange} >
            <div className='contenedor-doble'>
                <img src={`../src/assets/images/iconos/${vista ? 'vista.png' : 'no-vista.png'}`} alt='Icono Vista' width={20} height={20} />
                <p> {vista ? 'Vista' : 'Por Ver'} </p>
            </div>
        </button>,
        ventanaAceptar: <button className='boton-ventana boton-ventana-aceptar'> {props.mensaje || 'Aceptar'} </button>,
        ventanaCancelar: <button className='boton-ventana boton-ventana-cancelar'> {props.mensaje || 'Cancelar'} </button>,
        seleccionAutoridad: <select className='boton-seleccion' value={opcionSelect} onChange={handleSelectChange} >
            <option value={2}> Puede editar </option>
            <option value={1}> Solo lectura </option>
            <option value={0}> Eliminar </option>
        </select>,
        cambiarVentana: <button className='perfil-boton perfil-boton-amarillo negritas'> {props.mensaje || 'Cambiar Ventana'} </button>,
        agregarColaborador:
            <button onClick={handleEstadoBoton} className={`boton-ventana-colaborador ${estadoBoton ? 'boton-ventana-agregado' : 'boton-ventana-agregar'}`}>
                {estadoBoton ? 'Agregado' : '+ Añadir' }
            </button>,
    };

    return versionBoton[props.version] || <p> Error: Version de boton no definida. </p>
}



export default Boton