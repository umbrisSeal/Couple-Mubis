/*
    Modulo para forzar la importacion de imagenes estaticas como modulos para que Webpack los incluya en el build. Mandar a llamar la funcion y usarla como parametro para <img> como src={imagenSolicitada}
*/

// Importar todas las imagenes estaticas.
import Logo from '../images/logo.png';
import FondoPeliculas from '../images/fondoPeliculas.png';
import FiguraFlecha from '../images/figuraFlecha.png';

import AppPerfil_CoupleMubis from '../images/iconos/AppPerfil_CoupleMubis.png';
import AppPerfil_Refugio14 from '../images/iconos/AppPerfil_Refugio14.png';
import Boleto from '../images/iconos/boleto.png';
import Bootstrap from '../images/iconos/bootstrap.webp';
import Buscar from '../images/iconos/buscar.png';
import Editar from '../images/iconos/editar.png';
import Express from '../images/iconos/express.png';
import Javascript from '../images/iconos/javascript.png';
import No_Vista from '../images/iconos/no-vista.png';
import NodeJS from '../images/iconos/nodejs.png';
import Not_Found from '../images/iconos/not_found.webp';
import PeliculaRoja from '../images/iconos/pelicula-roja.png';
import PeliculaImg from '../images/iconos/pelicula.png';
import Pug from '../images/iconos/pug.png';
import React from '../images/iconos/react.png';
import VerMas from '../images/iconos/verMas.png';
import Vista from '../images/iconos/vista.png';

import Anonimo from '../images/perfiles/anonimo.png';
import Ballena from '../images/perfiles/ballena.jpg';
import Foca from '../images/perfiles/foca.jpg';
import Hongos from '../images/perfiles/hongos.jpg';
import Hormiga from '../images/perfiles/hormiga.jpg';
import Hornitorrinco from '../images/perfiles/hornitorrinco.jpg';
import Jirafa from '../images/perfiles/jirafa.jpg';
import Mapache from '../images/perfiles/mapache.jpg';
import Marmota from '../images/perfiles/marmota.jpg';
import Oso from '../images/perfiles/oso.jpg';
import Pez from '../images/perfiles/pez.jpg';
import Rosas from '../images/perfiles/rosas.jpg';
import Tigre from '../images/perfiles/tigre.jpg';
import Tortuga from '../images/perfiles/tortuga.jpg';
import Zorro from '../images/perfiles/zorro.jpg';

// Diccionario de referencias.
const MODULOS_IMAGEN = {
    'logo.png': Logo,
    'fondoPeliculas.png': FondoPeliculas,
    'figuraFlecha.png': FiguraFlecha,
    'AppPerfil_CoupleMubis.png': AppPerfil_CoupleMubis,
    'AppPerfil_Refugio14.png': AppPerfil_Refugio14,
    'boleto.png': Boleto,
    'bootstrap.webp': Bootstrap,
    'buscar.png': Buscar,
    'editar.png': Editar,
    'express.png': Express,
    'javascript.png': Javascript,
    'no-vista.png': No_Vista,
    'nodejs.png': NodeJS,
    'not_found.webp': Not_Found,
    'pelicula-roja.png': PeliculaRoja,
    'pelicula.png': PeliculaImg,
    'pug.png': Pug,
    'react.png': React,
    'verMas.png': VerMas,
    'vista.png': Vista,
    'anonimo.png': Anonimo,
    'ballena.jpg': Ballena,
    'foca.jpg': Foca,
    'hongos.jpg': Hongos,
    'hormiga.jpg': Hormiga,
    'hornitorrinco.jpg': Hornitorrinco,
    'jirafa.jpg': Jirafa,
    'mapache.jpg': Mapache,
    'marmota.jpg': Marmota,
    'oso.jpg': Oso,
    'pez.jpg': Pez,
    'rosas.jpg': Rosas,
    'tigre.jpg': Tigre,
    'tortuga.jpg': Tortuga,
    'zorro.jpg': Zorro,
};


// Funcion para mandar a llamar la ruta o imagen.

export function obtenerImagen(stringImagen) {

    if(MODULOS_IMAGEN[stringImagen] !== undefined) {
        return MODULOS_IMAGEN[stringImagen];
    } else {
        return '';
    }
}