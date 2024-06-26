
const axios = require("axios");

async function solicitarPelicula(peliculaID) {

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

}


module.exports = solicitarPelicula;