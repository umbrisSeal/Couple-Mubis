
const express = require('express');

const app = express();
const port = 3000;


app.get('/', (request, response) => {
    response.send('Hola mundo.');
})


app.listen(port, () => {
    console.log(`Ejecutando servidor en el puerto: ${port}`);
})