import React, { Fragment, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import '../styles/Perfil.css';
import { obtenerNivel } from '../assets/js/niveles';
import Header from '../components/Header';
import Boton from '../components/Boton';
import FormSwitch from '../components/FormSwitch';

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

    const handleAliasChange = (event) => setAlias(event.target.value);
    const handleUsarAliasChange = (estado) => setUsarAlias(estado);
    const handleUsarPrivacidadChange = (estado) => setUsarPrivacidad(estado);
    const handleBibliografiaChange = (event) => { setBibliografia(event.target.value); setCaracteres(event.target.value.length); }
    const handleBorrarCuentaChange = (event) => setBorrarCuenta(event.target.value);
    const handleIdiomaBusquedaChange = (event) => setIdiomaBusqueda(event.target.value);

    const actualizarPerfil = (event) => {
        event.preventDefault();
        // Mandar soliciutd HTTP.
    }

    
    //const handleUsarPrivacidadChange

    const caracteresMaximos = 160;


    const datosSimulados = {
        nombre: 'Mac Giver',
        id: 'RT0054AWSA',
        xp: 210,
        bibliografia: 'Hola! Soy Mac Gyver, autentico cineasta de los años 60. Vivi en una casa de campo hasta mis 50 años, ahora me dedico a criticar gente en internet.',
        esAmigo: false,
        esBloqueado: false,
        listasPublicas: [
            {nombre: 'La Toalla del Mojado', id: 'RFRTG31'},
            {nombre: 'Mis Actuaciones de 1971', id: 'RTGAW21'},
            {nombre: 'James Bond', id:'J5B4GG'},
        ]
    }

    /*
        Datos el usuario.
        {    // Datos simulados.
            idUsuario: '4GT70ARR49',
            nombre: 'Kevin Monterrey',
            xp: 100,
            alias: '',
            bibliografia: '',
            usarAlias: true,
            usarPrivacidad: true,
            usuariosBloqueados: [// {id, nombreUsuario} ],
            idiomaBusqueda: 0,
        }
        Datos de un usuario solicitado:
        {
            nombre: 'Mac Giver',
            id: 'RT0054AWSA',
            xp: 210,
            bibliografia: 'Hola! Soy Mac Gyver, autentico cineasta de los años 60. Vivi en una casa de campo hasta mis 50 años, ahora me dedico a criticar gente en internet.',
            esAmigo: false,
            esBloqueado: false,
            listasPublicas: [
                {nombre: 'La Toalla del Mojado', id: 'RFRTG31'},
                {nombre: 'Mis Actuaciones de 1971', id: 'RTGAW21'},
                {nombre: 'James Bond', id:'J5B4GG'},
            ]
        }
    */

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
                                <p> {usarAlias ? 'Se usara el Alias de Couple Mubis.' : 'Se usara tu mismo nombre de Refugio14.'} </p>
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
                        <p id='perfil-bibliografia'> {datosUsuario.bibliografia} </p>
                        <br />
                        <br />
                        <br />
                        <p> Listas Publicas: </p>
                        <div id='perfil-conjunto-listas'>
                            {datosUsuario.listasPublicas.map((lista, index) => {
                                return(
                                    <Link to={`/lista/${lista.id}`} className='no-hypervinculo' key={lista + index}>
                                        <div className='perfil-lista'>
                                            <img src='../src/assets/images/iconos/pelicula-roja.png' alt='Icono Pelicula' width={50} />
                                            <p> {lista.nombre} </p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </Fragment>
                }

            </div>
        </main>
    </Fragment>
}

export default Perfil