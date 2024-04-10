
/*
    Retorna las peliculas mas populares del dia, de acuerdo con la API.
*/

const axios = require('axios');

async function solicitarPeliculasPopulares() {

    const httpOptions = {
        method: 'get',
        url: `${process.env.API_URL}/3/movie/popular?language=en-US&page=1`,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
        // data: {}
    };

    let response;

    try {
        response = await axios(httpOptions);
        return response;
    } catch(error) {
        return false;
    }
}

module.exports = solicitarPeliculasPopulares;

/*
    const httpOptions = {
        method: 'get',
        url: `${process.env.API_URL}/3/movie/${peliculaID}?language=en-US`,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.API_TOKEN}`
        }
        // data: {}
    }

    let response;

    try {
        response = await axios(httpOptions);
        return response;
    } catch (error) {
        return false;
    }
    */