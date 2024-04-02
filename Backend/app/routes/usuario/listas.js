
const express = require('express');
const obtenerListasController = require('../../controllers/obtenerListasController');
const auth = require("../../auth/authenticar");
const listas = express.Router();

const sample = {
    cantidadListas: 1,
    listas: [
        {
            id: 'AJIOAJIO',
            nombre: 'Para maratonear! equisde!!',
            editores: ['Michael Jackson', 'Speed Demon', 'Jouse Torres', 'Marcus Finix'],
            privada: false,
            cantidadPeliculas: 1,
            urlPosters: ['qayaregrrfrf.jpg']
        }
    ]
}

/*
    - Datos para las listas
const datosSimulados = {
    cantidadListas: 5,
    listas: [
        {
            id: '3e9k7pd',
            nombre: 'Para maratonear!!! de d deded dexe',
            editores: ['Michael Jackson', 'Speed Demon', 'Josue Torres', 'Marcus Finix'],
            privada: false,
            cantidadPeliculas: 4,
            urlPosters: ['qayga07ICNDswm0cMJ8P3VwklFZ.jpg', 'wMZU69sPEP8dSNU0nMWVt7b54EQ.jpg', 'O7ncXwZ9bowJGLAfIhe9ZaRZdi.jpg', 'v5wAZwRqpGWmyAaaJ8BBHYuNXnj.jpg'],
        },
        {
            id: '8x1b2f9',
            nombre: '',
            editores: ['El Kevin', 'Jose Maximo'],
            privada: false,
            cantidadPeliculas: 1,
            urlPosters: ['O7ncXwZ9bowJGLAfIhe9ZaRZdi.jpg'],
        },
        {
            id: 'p4c6j2n',
            nombre: '',
            editores: [],
            privada: false,
            cantidadPeliculas: 5,
            urlPosters: ['vGujQOfGIaZx5UWxf9JdNEOxl7B.jpg', 'gh4cZbhZxyTbgxQPxD0dOudNPTn.jpg', 'qBOKWqAFbveZ4ryjJJwbie6tXkQ.jpg', 'r0bEDWO2w4a43K2xTNSF284qOsc.jpg', 'UHxxkYe9tRdiPu0JFgcEL5hmQ4.jpg'],
        },
        {
            id: 'a7s8r9t',
            nombre: '',
            editores: [],
            privada: false,
            cantidadPeliculas: 4,
            urlPosters: ['gOnmaxHo0412UVr1QM5Nekv1xPi.jpg', 'aiRSl5NcDwayFTPrxtUcde6Y5P9.jpg', 'vmq4DK7jThHjGfLBT7gwtX4H4hO.jpg', 'eTdEaRjtVnFbd5KVhxLRfbYW46e.jpg'],
        },
        {
            id: 'a7s8r9t',
            nombre: 'Mi lista vacia',
            editores: [],
            privada: false,
            cantidadPeliculas: 0,
            urlPosters: [],
        },
        {
            id: 'a7s8r9t',
            nombre: 'Chaturelete',
            editores: [],
            privada: false,
            cantidadPeliculas: 1,
            urlPosters: ['uyNLq2Dc3s4IOdcYTU8ZtM2lTjb.jpg'],
        },
    ]
}
    - Datos para las recomendaciones.
const datosSimulados2 = [
    {id: 671, titulo: 'Harry Potter and the Philosopher\'s Stone', año: 2013, urlPoster: 'wuMc08IPKEatf9rnMNXvIDxqP4W.jpg'},
    {id: 505832, titulo: "My Little Pony: Equestria Girls", año: 2012, urlPoster: 'dY7pdaPfbTnJnfnZBjRFprgRuUn.jpg'}
]
*/


listas.get("/", auth, obtenerListasController);


module.exports = listas;