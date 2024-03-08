import React, { Fragment } from 'react';
import '../styles/Lista.css';
import { Link } from 'react-router-dom';

function Lista({lista}) {

    const tamaño = 'w342';
    let contenido;

    const recortarString = (string) => {
        if(string.length == 0)  return '[Lista Sin Nombre]';
        if(string.length > 32) {
            return string.substring(0, 32) + ' ...';
        } else {
            return string;
        }
    }

    const mostrarEditores = (editores) => {
        const longitudMaxima = 22;
        let editoresRestantes = 0;

        if(editores.length != 0) {
            const stringEditores = editores.reduce((stringTotal, editor) => {
                if(stringTotal.length < longitudMaxima && stringTotal.length + editor.length < longitudMaxima) {
                    // Verificar si no es el primer o ultimo elemento.
                        // Si es el primer elemento aplicar la formula:
                        // Si no, agregar una coma.
                    return `${stringTotal} ${editor}`;
                } else {
                    editoresRestantes += 1;
                    return stringTotal;
                }
            }, "Con:");
    
            if(editoresRestantes > 0) {
                return `${stringEditores} y ${editoresRestantes} mas.`;
            } else {
                return editoresRestantes;
            }
        } else {
            return 'Solo tu.'
        }
        
    }

    switch(lista.cantidadPeliculas) {
        case 1:
            contenido = <Fragment>
                <img src={`https://image.tmdb.org/t/p/${tamaño}/${lista.urlPosters[0]}`} width={'100%'} height={'100%'} className='borde-izquierdo borde-derecho' />
            </Fragment>
            break;

        case 2:
            contenido = <Fragment>
                <img src={`https://image.tmdb.org/t/p/${tamaño}/${lista.urlPosters[0]}`} width={'50%'} height={'100%'} className='borde-izquierdo' />
                <img src={`https://image.tmdb.org/t/p/${tamaño}/${lista.urlPosters[1]}`} width={'50%'} height={'100%'} className='borde-derecho' />
            </Fragment>
            break;

        case 3:
            contenido = <Fragment>
                <div className='contenedor-posters-lateral'>
                    <img src={`https://image.tmdb.org/t/p/${tamaño}/${lista.urlPosters[0]}`} width={'100%'} height={'100%'} className='borde-izquierdo' />
                </div>
                <div className='contenedor-posters-lateral'>
                    <img src={`https://image.tmdb.org/t/p/${tamaño}/${lista.urlPosters[1]}`} width={'100%'} height={'50%'} className='borde-derecho' />
                    <img src={`https://image.tmdb.org/t/p/${tamaño}/${lista.urlPosters[2]}`} width={'100%'} height={'50%'} className='' />
                </div>
            </Fragment>
            break;

        case 4:
            contenido = <Fragment>
                <div className='contenedor-posters-lateral'>
                    <img src={`https://image.tmdb.org/t/p/${tamaño}/${lista.urlPosters[0]}`} width={'100%'} height={'50%'} className='borde-izquierdo' />
                    <img src={`https://image.tmdb.org/t/p/${tamaño}/${lista.urlPosters[1]}`} width={'100%'} height={'50%'} className='' />
                </div>
                <div className='contenedor-posters-lateral'>
                    <img src={`https://image.tmdb.org/t/p/${tamaño}/${lista.urlPosters[2]}`} width={'100%'} height={'50%'} className='borde-derecho' />
                    <img src={`https://image.tmdb.org/t/p/${tamaño}/${lista.urlPosters[3]}`} width={'100%'} height={'50%'} className='' />
                </div>
            </Fragment>
            break;
        default:
            // Agregar un mensaje de "no hay peliculas en esta lista" o algo asi.
            break;
    }

    return (
        <div className='contenedor-lista'>
            <Link to={`/lista/${lista.id}`} className='no-hypervinculo'>
                <div className='contenedor-posters'>
                    {contenido}
                </div>
                <div className='contenedor-informacion'>
                    <p className='lista-nombre'> {recortarString(lista.nombre)} </p>
                    <p className='lista-colaboradores'> {mostrarEditores(lista.editores)} </p>
                </div>
            </Link>
        </div>
    )
}

export default Lista

/*
    id: 'ERT45GG',
            nombre: '',
            editores: [''],
            privada: false,
            cantidadPeliculas: 4,
    urlPosters: [],
    w92
    <img src={`https://image.tmdb.org/t/p/${tamaño}/${pelicula.urlPoster}`} />

    "w92",
    "w154",
    "w185",
    "w342",
    "w500",
    "w780",
    "original"

    - 0 images: transparent

    - 1 image: full with x heigth
    - 2 image: full with x 1/2 height
    - 3 image full 1 fill wifth 1/2 height; 2 1/2 1/2
    - 4 image half all with and heith


    2
    1   [full space]
    2   [full heigth] [half width]
    3   [full heigth] [half width] / [half all]




*/