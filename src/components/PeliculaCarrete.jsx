import React from 'react'

function PeliculaCarrete(props) {

    const {url, index} = props;

    const tamaño = "w342";
    const urlPoster = `https://image.tmdb.org/t/p/${tamaño}/${url}`;

    const esPar = (index) => {
        return ((index+1) % 2) == 0;
    }
    /*
        "w92",
        "w154",
        "w185",
        "w342",
        "w500",
        "w780",
        "original"
    */

    return(
        <div>
            <img src={urlPoster} alt={`Nombre Auxiliar ${index}`}
                style={{ rotate: esPar(index) ? '3deg' : '-3deg', width: '300px' } }
            />
        </div>
    )
}

export default PeliculaCarrete