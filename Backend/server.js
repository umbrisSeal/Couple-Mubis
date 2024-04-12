require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = process.env.PUERTO;

const mainRouter = require('./app/routes/api');


app.use(cookieParser());    // Get cookies.
app.use(express.json());     // Allow req.body
//app.use(cors({origin: 'http://localhost:5173'}));        // Habilita el CORS para cualquier dominio. (Evita agregar los siguientes headers manualmente en cada respuesta:)

/*
  res.setHeader('Access-Control-Allow-Origin', 'http://example.com'); // Reemplaza 'http://example.com' con tu dominio permitido
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos HTTP permitidos
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeceras permitidas
  next();
*/

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));



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