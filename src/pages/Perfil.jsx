import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import '../styles/Perfil.css';
import { obtenerNivel } from '../assets/js/niveles';
import Header from '../components/Header';
import Boton from '../components/Boton';
import FormSwitch from '../components/FormSwitch';
import DIRECCIONES from '../assets/js/diccionarioURLs';

function Perfil(props) {
    const datosUsuario = useLoaderData();
    const [configuracion, setConfiguracion] = useState(props.configuracion || false);
    const [alias, setAlias] = useState(datosUsuario.alias || '');
    const [usarAlias, setUsarAlias] = useState(datosUsuario.usarAlias || false);
    const [usarPrivacidad, setUsarPrivacidad] = useState(datosUsuario.usarPrivacidad || false);
    const [bibliografia, setBibliografia] = useState(datosUsuario.bibliografia);
    const [idiomaBusqueda, setIdiomaBusqueda] = useState(datosUsuario.idiomaBusqueda || 0);
    const [borrarCuenta, setBorrarCuenta] = useState('');
    const [caracteres, setCaracteres] = useState(datosUsuario.bibliografia.length);
    const [amigoAgregado, setAmigoAgregado] = useState(false);
    const [perfilSelf, setPerfilSelf] = useState(false);
    const parametrosURL = useParams();

    console.log(parametrosURL);

    const handleAliasChange = (event) => setAlias(event.target.value);
    const handleUsarAliasChange = (estado) => setUsarAlias(estado);
    const handleUsarPrivacidadChange = (estado) => setUsarPrivacidad(estado);
    const handleBibliografiaChange = (event) => { setBibliografia(event.target.value); setCaracteres(event.target.value.length); }
    const handleBorrarCuentaChange = (event) => setBorrarCuenta(event.target.value);
    const handleIdiomaBusquedaChange = (event) => setIdiomaBusqueda(event.target.value);

    async function obtenerUserID() {
        const userID = fetch(`${DIRECCIONES.BACKEND}/`)
    }

    useEffect(() => {

        const fetchPerfilSelf = async () => {
            return await obtenerUserID();
        }
        const presentarSelfPerfil = fetchPerfilSelf();
        if(!presentarSelfPerfil) {
            // hacer la otra solicitud.
        }
        // Endpoint para consultar el userID y compararlo con el id mostrado actualmente (useParams) en dicho caso ocultar botones.
        // Endpoint para consultar si el perfil mostrado aparece en la lista de amigos tuya. (Eliminar Amigo instead?) en lugar de bloquear cambiar boton.
    }, [])

    /*
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
    */

    const actualizarPerfil = async (event) => {
        event.preventDefault();
        const requestBody = {
            alias,
            usarAlias,
            usarPrivacidad,
            bibliografia,
            idiomaBusqueda
        };
        try {
            const jsonBody = JSON.stringify(requestBody);
            await fetch(`${DIRECCIONES.BACKEND}/api/cuenta`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Origin': `${DIRECCIONES.BACKEND}`,
                    'Content-Type': 'application/json'
                },
                body: jsonBody
            }).then(response => response.ok).catch(error => false);
        } catch {}
    }

    const caracteresMaximos = 160;

    return <Fragment>
        <Header version='perfil' configuracion={configuracion} />
        <main className='fondo-rojo contenedor-informacion-perfil'>
            <div className='contenedor-informacion-perfil-perfil'>
                <h1 className='negritas'> {datosUsuario.nombre} </h1>
                <p> {`ID: ${datosUsuario.id}`} </p>
                <br />
                <p> {`Nivel ${obtenerNivel(datosUsuario.xp).nivel}`} </p>
                <h4 className='negritas'> {obtenerNivel(datosUsuario.xp).nombreNivel} </h4>
                <br />

                { configuracion ?
                    <Fragment>
                        <div className='contenedor-barraxp'>
                            <p className='barraxp-datos'> {` ${obtenerNivel(datosUsuario.xp).xpRestante} XP / ${obtenerNivel(datosUsuario.xp).xpSiguienteNivel} XP `} </p>
                            <div className='barraxp-fondo'>
                                <div className='barraxp-relleno' style={{width: `${obtenerNivel(datosUsuario.xp).porcentaje}%`}}></div>
                            </div>
                        </div>
                        <form className='grid-configuracion' onSubmit={actualizarPerfil}>

                            <label htmlFor='configuracion-alias'> Alias de Couple Mubis: </label>
                            <input id='configuracion-alias' className='configuracion-input' name='configuracion-alias' placeholder='Ingresa un alias...' value={alias} onChange={handleAliasChange} maxLength={15} />

                            <label> Mostrar Nombre de Usuario: </label>
                            <div className='configuracion-conjunto-switch'>
                                <FormSwitch estadoInicial={usarAlias} handleChange={handleUsarAliasChange} />
                                <p> {usarAlias ? 'Se usara tu Alias de Couple Mubis.' : 'Se usara el mismo nombre de tu cuenta Refugio14.'} </p>
                            </div>

                            <label> Privacidad de Perfil: </label>
                            <div className='configuracion-conjunto-switch'>
                                <FormSwitch estadoInicial={usarPrivacidad} handleChange={handleUsarPrivacidadChange} />
                                <p> {usarPrivacidad ? 'ACTIVADO: Nadie puede ver tu perfil ni agregarte como amigo.' : 'DESACTIVADO: Tu perfil es publico y cualquiera en Couple Mubis lo puede ver.'} </p>
                            </div>

                            <label htmlFor='configuracion-bibliografia'> Biografia de Perfil: </label>
                            <div className='configuracion-contenedor-bibliografia'>
                                <textarea id='configuracion-bibliografia' className='configuracion-input' name='configuracion-bibliografia' placeholder='¿Que peliculas te gustan? Compartelo con el mundo! ... ' value={bibliografia} onChange={handleBibliografiaChange} maxLength={caracteresMaximos} />
                                <span className='configuracion-indicador-caracteres'> {`${caracteres} / ${caracteresMaximos}`} </span>
                            </div>

                            <label htmlFor='configuracion-idioma'> Idioma de Busqueda: </label>
                            <select id='configuracion-idioma' className='configuracion-input' name='configuracion-idioma' value={idiomaBusqueda} onChange={handleIdiomaBusquedaChange}>
                                <option value={0}> Cualquiera </option>
                                <option value={1}> Español </option>
                                <option value={2}> Ingles </option>
                            </select>

                            <label htmlFor='configuracion-borrarcuenta'> Borra cuenta de Couple Mubis: </label>
                            <div>
                                <input id='configuracion-borrarcuenta' className='configuracion-input' name='configuracion-borrarcuenta' placeholder='Escribe "BORRAR" para confirmar' value={borrarCuenta} onChange={handleBorrarCuentaChange} maxLength={6} />
                                <span style={{margin: '0px 1rem'}}>
                                    <Boton version='perfilBorrar' mensaje='Borrar Cuenta' />
                                </span>
                            </div>

                            <Boton version='perfilGuardar' mensaje='Guardar Cambios' />
                        </form>
                    </Fragment>
                :
                    <Fragment>
                        <div id='perfil-botones'>
                            <Boton version='perfilAgregar' />
                            <Boton version='perfilBloquear' />
                        </div>
                        <br />
                        <br />
                        <p> Bibliografia: </p>
                        <p id='perfil-bibliografia'>
                            { datosUsuario.bibliografia.length === 0 ? 
                                <span style={{fontStyle: 'italic'}}> Este usuario aun no ha compartido informacion. </span>
                                :
                                datosUsuario.bibliografia
                            }
                        </p>
                        <br />
                        <br />
                        <br />
                        <p> Listas Publicas: </p>
                        <div id='perfil-conjunto-listas'>
                            { datosUsuario.listasPublicas.length !== 0 ?
                                datosUsuario.listasPublicas.map((lista, index) => {
                                    return(
                                        <Link to={`/lista/${lista.id}`} className='no-hypervinculo' key={lista + index}>
                                            <div className='perfil-lista'>
                                                <img src='../src/assets/images/iconos/pelicula-roja.png' alt='Icono Pelicula' width={50} />
                                                <p> {lista.nombre} </p>
                                            </div>
                                        </Link>
                                    )
                                })
                                :
                                <span style={{fontStyle: 'italic'}}> Este usuario no tiene listas publicas disponibles. </span>
                            }
                        </div>
                    </Fragment>
                }

            </div>
        </main>
    </Fragment>
}

export default Perfil