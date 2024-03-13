import React, { useState } from 'react'
import '../styles/FormSwitch.css';

function FormSwitch({estadoInicial, cambiarEstado}) {
    const [estado, setEstado] = useState(estadoInicial || false);

    const modificarEstado = () => {
        setEstado(!estado);
        cambiarEstado(!estado);
    }

    return (
        <button type='button' className='contenedor-switch' onClick={modificarEstado} style={{backgroundColor: `${estado ? 'var(--secundario)' : 'transparent'}`}} >
            <div className='indicador-switch' style={{transform: `translateX(${estado ? '190' : '0'}%)`}}></div>
        </button>
    )
}

export default FormSwitch