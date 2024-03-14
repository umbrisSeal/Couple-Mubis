import React, { useState } from 'react'
import '../styles/Boton.css';


function Boton(props) {
    const [vista, setVista] = useState(props.vista || false);

    const handleChange = () => {
        props.handleBotonChange();
        setVista(!vista);
    }


    const versionBoton = {
        loginTransparente: <button type='button' className='boton bordeado-amarillo'> Login </button>,
        carrete: <button type='button' className='boton-grande amarillo'> Crea una cuenta </button>,
        loginSubmit: <button type='submit' className='boton-mediano azul texto-capital'> {props.texto ? props.texto : 'Entrar'} </button>,
        verPelicula: <button type='button' className='boton-borde boton-grande borde-rojo-intenso texto-capital'> Ver pelicula </button>,
        agregarLista:
            <button type='button' className='boton-borde borde-amarillo texto-grande texto-capital'>
                <div className='contenedor-doble negritas'>
                    <img src='../src/assets/images/iconos/pelicula.png' alt='Icono Pelicula' height={30} width={30} />
                    <p> Crear lista </p>
                </div>
            </button>,
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
        listaEditar: <button type='button' className='boton-lista lista-gris' > Editar Lista </button>,
        listaBorrar: <button type='button' className='boton-lista lista-rojo'> Borrar Lista </button>,
        peliculaBorrar: <button type='button' className='boton-pelicula boton-pelicula-borrar'> Borrar </button>,
        peliculaVer: <button type='button' className={`boton-pelicula ${vista ? 'boton-pelicula-vista' : 'boton-pelicula-novista'}`} onClick={handleChange} >
            <div className='contenedor-doble'>
                <img src={`../src/assets/images/iconos/${vista ? 'vista.png' : 'no-vista.png'}`} alt='Icono Vista' width={20} height={20} />
                <p> {vista ? 'Vista' : 'Por Ver'} </p>
            </div>
        </button>,
    };

    return versionBoton[props.version] || <p> Error: Version de boton no definida. </p>
}



export default Boton