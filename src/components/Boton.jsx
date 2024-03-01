import React, { version } from 'react'
import '../styles/Boton.css';


function Boton(props) {

    const versionBoton = {
        loginTransparente: <button type='button' className='boton bordeado-amarillo'> Login </button>,
        carrete: <button type='button' className='boton-grande amarillo'> Crea una cuenta </button>
    };

    return versionBoton[props.version] || <p> Error: Version de boton no definida. </p>
}



export default Boton