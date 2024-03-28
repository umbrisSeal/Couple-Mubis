require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PUERTO;

const mainRouter = require('./app/routes/api');


app.use(cookieParser());    // Get cookies.
app.use(express.json())     // Allow req.body

// Se necesita verificar que el body es un json valido.

app.use((error, request, response, next) => {
    if(error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        response.status(400).send("Error en la estructura del body, no se puede convertir a JSON.");
        return;
    }
    next();
})


app.use('/api', mainRouter);


app.all("*", (req, res) => {
    res.send("Esto es un error, no encontre la ruta.");
})




app.listen(port, () => {
    console.log(`Ejecutando servidor en el puerto: ${port}`);
})