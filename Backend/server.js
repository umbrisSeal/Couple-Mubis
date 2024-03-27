require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PUERTO;



const cookieParser = require('cookie-parser');


const mainRouter = require('./app/routes/api');


app.use(cookieParser());    // Get cookies.
app.use(express.json())     // Allow req.body


app.use('/api', mainRouter);


app.all("*", (req, res) => {
    res.send("Esto es un error, no encontre la ruta.");
})




app.listen(port, () => {
    console.log(`Ejecutando servidor en el puerto: ${port}`);
})