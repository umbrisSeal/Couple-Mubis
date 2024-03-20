const express = require('express');
const mainRouter = express.Router();

const generarID = require('../helpers/generarID');
const hashearPassword = require('../helpers/hashearPassword');

const cuenta = require('./cuenta');


mainRouter.use("/cuenta", cuenta);


mainRouter.get("/", async (req, res) => {
    // Para testing.

    const passwordHasheado = await hashearPassword("fc882c4231159c7c8c4dc14c21b007588816223106f79937db7b7db507f94b6e");

    res.send(`Sistema Activo, tu nuevo hash es: ${passwordHasheado.hash} y se genero con una salt de: ${passwordHasheado.salt}`);
})




module.exports = mainRouter;