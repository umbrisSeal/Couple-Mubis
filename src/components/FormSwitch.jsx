import React, { useState } from 'react'
import '../styles/FormSwitch.css';

function FormSwitch({estadoInicial, handleChange}) {
    const [estado, setEstado] = useState(estadoInicial || false);

    const modificarEstado = () => {
        setEstado(!estado);
        handleChange(!estado);
    }

    return (
        <button type='button' className='contenedor-switch' onClick={modificarEstado} style={{backgroundColor: `${estado ? 'var(--secundario)' : 'transparent'}`}} >
            <div className='indicador-switch' style={{transform: `translateX(${estado ? '190' : '0'}%)`}}></div>
        </button>
    )
}

export default FormSwitch