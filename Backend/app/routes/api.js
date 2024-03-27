const express = require('express');
const mainRouter = express.Router();

const generarID = require('../helpers/generarID');
const hashearPassword = require('../helpers/hashearPassword');

const cuenta = require('./cuenta');


mainRouter.use("/cuenta", cuenta);


mainRouter.get("/", async (req, res) => {
    // Para testing.

    const passwordHasheado = await hashearPassword("0d15dc44680a0cf58a4dfedb3d6c30cc4ed2250fd04a114609126fd766161e34");

    res.send(`Sistema Activo, tu nuevo hash es: ${passwordHasheado.hash} y se genero con una salt de: ${passwordHasheado.salt}`);
})




module.exports = mainRouter;