
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

/*

const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/movie/12?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzIxMGEyYTg0ZmQ3NzZmYjQwNTQ4NjAyMjlhOTA1ZCIsInN1YiI6IjY1ZDk3MzRjNjA5NzUwMDE2NGE2MDE2MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uAuWf6dgIcvTgx_a1_MHXSuTuo--ncH6quzoCWihAtY'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));

*/