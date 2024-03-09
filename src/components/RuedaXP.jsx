import React, { Fragment } from 'react'
import '../styles/RuedaXP.css';

function RuedaXP({nivel}) {

    if(!nivel) return <p> Error: No hay suficientes datos para RuedaXP.</p>

    // Calcular el porcentaje de circulo relleno.
    const calcularRellenoGrados = (xp, xpMaxima) => {
        const rellenoGrados = Math.ceil((xp * 360) / xpMaxima);
        if(rellenoGrados > 360) {
            return 360;
        } else {
            return rellenoGrados;
        }
    }

    return (
        <div className='contenedor-ruedaxp'>
            <div
                className='circulo-progreso'
                style={{background: `conic-gradient(var(--acento) ${calcularRellenoGrados(nivel.xpRestante, nivel.xpSiguienteNivel)}deg, var(--acento2) 0deg)`}}
            >
                <div className='circulo-relleno'>
                    <p id='texto-xp'> xp </p>
                    <p id='puntos-xp'> {nivel.xpRestante} </p>
                    <p id='puntos-xp-restantes'> {`/${nivel.xpSiguienteNivel}`} </p>
                </div>
            </div>
        </div>
    )
};

export default RuedaXP;

/*

background: conic-gradient(var(--acento) 112deg, var(--acento2) 0deg);

*/