import React from 'react'
import '../styles/TarjetaTecnica.css';

function TarjetaTecnica(props) {
    // frontend or backend
    if (props.version === 'frontend') {
        var titulo = 'FRONTEND'
        var detalles = [
            "Interfaz de usuario con React.js.",
            "Componentes renderizados con ReactDOM.",
            "Diseño de pagina Responsive.",
            "Solicitudes HTTP con FetchAPI y AJAX.",
            "Estilos CSS con Bootstrap.",
            "Diseño de pagina SPA."
        ];
        var imagenes = [
            'react.png',
            'javascript.png',
            'bootstrap.webp'
        ];

    } else if (props.version === 'backend') {
        var titulo = 'BACKEND'
        var detalles = [
            "Backend con Node.js.",
            "Manejo de solicitudes con Express.js.",
            "Arquitectura Monolitica.",
            "Bases de datos con MySQL.",
            "Uso de Sequelize como ORM.",
            "Autenticacion de usuarios por tokens.",
            "Uso de APIs de terceros (TMDB, etc.).",
            "SSO con app principal y SSR con Pug."
        ];
        var imagenes = [
            'nodejs.png',
            'express.png',
            'pug.png'
        ];
    } else {
        return <p> Error: Tarjeta tecnica no definida. </p>
    }

    return (
        <div className='tarjeta-tecnica'>
            <h3> {titulo} </h3>
            <div className='d-flex align-items-center justify-content-center gap-4 contenedor-imagenes'>
                { imagenes.map((imagen) => {
                    return (
                        <img src={`src/assets/images/iconos/${imagen}`} alt='Icono Herramienta.' width='50px' height='auto' key={Symbol(imagen).toString()} />
                    )
                }) }
            </div>
            <ul className='lista-detalles'>
                { detalles.map((detalle) => {
                    return (
                        <li key={Symbol(detalle).toString()}> {detalle} </li>
                    )
                }) }
            </ul>
        </div>
    )
}

export default TarjetaTecnica