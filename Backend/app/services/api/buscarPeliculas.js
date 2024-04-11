
const axios = require("axios");

async function buscarPeliculas(parametroBusqueda) {

    const queryBusqueda = encodeURIComponent(parametroBusqueda);

    const httpOptions = {
        method: 'get',
        url: `${process.env.API_URL}/3/search/movie?query=${queryBusqueda}&include_adult=false&language=en-US&page=1`,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.API_TOKEN}`
        },
        // data: {},
    }

    let response;

    try {
        response = await axios(httpOptions);
        return response;
    } catch(error) {
        return false;
    }
}

module.exports = buscarPeliculas;